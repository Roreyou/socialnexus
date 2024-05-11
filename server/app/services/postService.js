// services/postService.js

const { where } = require('sequelize');
const db = require('../models/index');
const ActivityService = require('./activityService');
const teamService = require('./teamService');
const otherService = require('./otherService');
const fs = require('fs/promises');
const path = require('path');
const replyService = require('./replyService');
const notification = require('../models/notification');
const commentService = require('./commentService');

class postService{
    static async createPost(postData){
        try {
            // 将数组形式的图片链接转换为逗号分隔的字符串
            const pictureString = postData.picture.join(',');
            // 将转换后的字符串赋值给 postData.picture
            postData.picture = pictureString;
            const newPost = await db.post.create(postData); // 在数据库中创建新的帖子
            // 补充 postTime 字段
            const currentTime = new Date().toISOString();
            newPost.post_time = currentTime;

            // 将 like 字段设置为 0
            newPost.like = 0;
            await newPost.save();
            return newPost.id; // 返回新创建帖子的ID

        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Error creating post');
        }
    }
    static async getPostDetails(postId){
        try {
            const post = await db.post.findByPk(postId);
            post.picture = post.picture.split(','); // 将逗号分隔的图片链接字符串转换为数组
            const tmp = await this.getPostsHandled([post]);

            //查看有无点赞
            const flag = await db.likepost.findOne({
                where: {
                    team_id: post.team_id,
                    post_id: postId
                }
            });
            const result = tmp[0];
            if(!flag){
                return {
                    ...result,
                    fabulous : false
                }
            }
            else {
                return {
                    ...result,
                    fabulous : true
                }
            }             
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching post details');
        }
    }

    //处理帖子中队伍名映射、获取评论条数、获取队伍头像的统一接口
    static async getPostsHandled(posts){
        const results = await Promise.all(posts.map(async post => {               
            const team_name = await teamService.getTeamMapName(post.team_id);

            // 统计评论数量
            const commentCount = await db.comment.count({
                where: {
                    post_id: post.id
                }
            });

            //获取队伍头像
            const team_avatar = await db.team.findOne({
                where: {
                  id: post.team_id
                },
                attributes:['avatar'] 
              });
            return {
                ...post.dataValues,
                team_name: team_name.team_name ? team_name.team_name : null,
                com_num: commentCount,
                team_avatar: team_avatar.avatar ? team_avatar.avatar : null
              };
        }));    
        return results;
    }

    // 获取同区域帖子
    static async getSameAreaPosts(province, city, page) {
        
        try {
            // 调用数据库查询方法获取同区域帖子
            const posts = await db.post.findAll({
                where: {
                    province:province,
                    city: city
                }
            });
            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(posts);  
            // 分页
            const pageResults = ActivityService.getPageData(page, results);
            return pageResults;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching same area posts');
        }
    }

    // 获取热门帖子
    static async getHotPosts(page) {
        try {
            // 调用数据库查询方法获取热门帖子
            const posts = await db.post.findAll({
                order: [['like', 'DESC']],
                limit: 100
            });

            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(posts);
            // 分页
            const pageResults = await ActivityService.getPageData(page, results);
            return pageResults;
        } catch (error) {
            throw new Error('Error fetching hot posts');
        }
    }

    // 获取最新帖子
    static async getLatestPosts(page) {
        try {
            // 调用数据库查询方法获取最新帖子
            // 按照发布时间降序排列，取前10条数据
            const posts = await db.post.findAll({
                order: [['post_time', 'DESC']],
                limit: 100
            });
            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(posts);
            //分页
            const pageResults = await ActivityService.getPageData(page, results);
            return pageResults;
        } catch (error) {
            throw new Error('Error fetching latest posts');
        }
    }

    static async getOwnerTeamIdByPostId(post_id){
        // 根据 post_id 在 post 表中找到对应的 team_id
        const post = await db.post.findByPk(post_id);
        if (!post) {
            throw new Error('Post not found');
        }
        const ownerTeam_id = post.team_id;
        return ownerTeam_id;
    }

    // 更新通知
    static async updateNotification(post_id, ownerTeam_id, ifadd){
        // 更新在notification表里面

        // 在 notification 表中找到对应的记录并将 num 字段加 1
        var notification = await db.notification.findOne({ where: { post_id:post_id, team_id:ownerTeam_id } });
        if (!notification) {
            // 创建新的通知记录
            notification = await db.notification.create({ post_id, team_id:ownerTeam_id, num: 0 });
        }       
        if(ifadd){
            // 更新 num 字段
            console.log("debug ifadd:",ifadd);
            notification.num += 1;
        }else{
            // 更新 num 字段
            console.log("debug ifadd01:",ifadd);
            notification.num -= 1;
        }

        await notification.save();
    }

    // 给帖子点赞/取消点赞
    static async likePost(post_id, team_id){
        try { 

            // 查看是否点赞过
            const existingLike = await db.likepost.findOne({
                where: {
                    post_id: post_id,
                    team_id: team_id
                }
            });

            // 检查点赞状态
            if (existingLike) {
                // 如果已经点赞，则取消点赞，删除点赞记录，减少点赞数
                await existingLike.destroy();
                
                // 更新帖子点赞数
                const post = await db.post.findByPk(post_id);
                if (!post) {
                    throw new Error('Post not found');
                }
                post.like -= 1;
                await post.save();

                // 更新通知数        
                const ownerTeam_id = this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id,ownerTeam_id, false);

                return "unlike successfully!";
            } else {

                // 如果未点赞，则进行点赞，创建点赞记录，增加点赞数
                const newLike = await db.likepost.create({
                    post_id: post_id,
                    team_id: team_id,
                    ifread: 1,
                    liketime: await otherService.getCurrentTime()
                });
                console.log("debug post_id00:",post_id);
                // 更新帖子点赞数
                const post = await db.post.findByPk(post_id);
                if (!post) {
                    throw new Error('Post not found');
                }
                post.like += 1;
                await post.save();

                // 更新通知数
                const ownerTeam_id = this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id,ownerTeam_id, true);
                return "like successfully!";
            }
        } catch (error) {
            throw new Error('Error liking post');
        }
    }

    // 给评论点赞/取消点赞
    static async likeCom(comment_id, team_id){
        try { 

            // 查看是否点赞过
            const existingLike = await db.likecomment.findOne({
                where: {
                    comment_id: comment_id,
                    team_id: team_id
                }
            });

            // 检查点赞状态
            if (existingLike) {
                // 如果已经点赞，则取消点赞，删除点赞记录，减少点赞数
                await existingLike.destroy();
                
                // 更新评论点赞数
                const comment = await db.comment.findOne({
                    where:{
                        id: comment_id,
                        team_id: team_id
                    }
                });

                if (!comment) {
                    throw new Error('Comment not found');
                }
                comment.like -= 1;
                await comment.save();
                //更新通知：
                const post_id = await this.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, false);
                return "unlike successfully!";
            } else {
                // 如果未点赞，则进行点赞，创建点赞记录，增加点赞数
                const newLike = await db.likecomment.create({
                    comment_id: comment_id,
                    team_id: team_id,
                    ifread: 1,
                    liketime: await otherService.getCurrentTime()
                });
                
                // 更新评论点赞数
                const likeCom = await db.comment.findOne({
                    where:{
                        id: comment_id,
                        team_id: team_id
                    }
                });

                if (!likeCom) {
                    throw new Error('Comment not found');
                }
                likeCom.like += 1;
                await likeCom.save();

                //更新通知：
                const post_id = await this.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, true);

                return "like successfully!";
            }
        } catch (error) {
            throw new Error('Error liking post');
        }
    }

    //给回复点赞/取消点赞
    static async likeReply(reply_id, team_id){
        try {
            // 检查是否存在点赞记录
            const existingLike = await db.likereply.findOne({
                where: {
                    reply_id: reply_id,
                    team_id: team_id
                }
            });
    
            // 检查点赞状态
            if (existingLike) {
                // 如果已经点赞，则取消点赞，删除点赞记录，减少点赞数
                await existingLike.destroy();
                
                // 更新回复点赞数
                const reply = await db.reply.findOne({
                    where:{
                        id: reply_id
                    }
                });
    
                if (!reply) {
                    throw new Error('Reply not found');
                }
                reply.like -= 1;
                await reply.save();

                // 更新通知
                const post_id = await this.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, false);
    
                return "unlike successfully!";
            } else {
                // 如果未点赞，则进行点赞，创建点赞记录，增加点赞数
                const newLike = await db.likereply.create({
                    reply_id: reply_id,
                    team_id: team_id,
                    ifread: 1,
                    liketime: await otherService.getCurrentTime()
                });
                
                // 更新回复点赞数
                const reply = await db.reply.findOne({
                    where:{
                        id: reply_id
                    }
                });
    
                if (!reply) {
                    throw new Error('Reply not found');
                }
                reply.like += 1;
                await reply.save();
                //更新通知：
                const post_id = await this.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, true);
                return "like successfully!";
            }
        } catch (error) {
            throw new Error('Error liking reply');
        }
    }

    static async getnotice(team_id) {
        try {
            // 查询评论列表
            const commentList = await db.comment.findAll({
                where: { team_id: team_id }
            });
            const enhancedCommentList = await Promise.all(commentList.map(async (comment) => {
                const team = await db.team.findByPk(comment.team_id, { attributes: ['team_name', 'avatar'] });
                const teamInfo = team ? { team_name: team.team_name, avatar: team.avatar } : null;
                return { ...comment.dataValues, team_info: teamInfo };
            }));
            
            console.log("comlist:",commentList);
            // 查询点赞列表
            const likeList = await db.likepost.findAll({
                where: { team_id: team_id },
                include: [{
                    model: db.team,
                    attributes: ['team_name', 'avatar']
                }]
            });

            return { comment_list: commentList, like_list: likeList };
        } catch (error) {
            throw new Error('Error fetching notifications');
        }
    }

    static async getPostIdByCommentId(comment_id){
        try {
            // 根据评论ID查找对应的帖子
            const comment = await db.comment.findByPk(comment_id);
            if (!comment) {
                throw new Error('Comment not found');
            }
            // 获取帖子ID
            const postId = comment.post_id;
            return postId;
        } catch (error) {
            throw error;
        }
    }

    static async createReply(comment_id, reply_content, team_id){
        try {
            const reply = await db.reply.create({
                comment_id: comment_id,
                reply_id: team_id,
                content: reply_content,
                time: await otherService.getCurrentTime(),
                like: 0,
                ifread:1
            });
            //更新通知
            //找到comment id对应的帖子id，在帖子中找到该帖子拥有者的id
            const post_id = await this.getPostIdByCommentId(comment_id);
            const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
            await this.updateNotification(post_id, ownerTeam_id, true);
            // 获取该评论的新的回复列表
            const newReply = await replyService.getReplyOfAComment(comment_id);
            return newReply;
        } catch (error) {
            throw error;
        }
    }

    static async getCommentLikesFromAcomment(commentId){
        const relatedLikeComments = await db.likecomment.findAll({
            where: {
                comment_id: commentId
            }
        });
        return relatedLikeComments;
    }

    static async getCommentLikesFromComments(comments){
        // 返回结构：[[{likecomment},...,{likecooment}],...,[{likecomment},...,{likecooment}] ]
        // 最外层元素是不同的comments，内层数组的不同元素是同一个comment的不同点赞信息
        var commentLikes = [];
        for (const comment of comments) {
            // 获取每个评论的点赞信息
            const relatedLikeComments = await this.getCommentLikesFromAcomment(comment.id);

            // 将每个评论的点赞信息加入到结果数组中
            commentLikes.push(relatedLikeComments);
        }

        return commentLikes; // 结构：[[{},{},...,{}],[{},{},...,{}]...[{},{},...,{}]]
    }

    static async deleteCommentNotification(relatedLikeComments){
        for (const likeComment of relatedLikeComments) {
            const ifread = likeComment.ifread;
            // 删除点赞信息
            await likeComment.destroy();

            // 如果点赞信息的 ifread 字段为 1，则更新通知
            if (ifread  === 1) {
                const post_id = await this.getPostIdByCommentId(likeComment.comment_id);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, false);
            }
        }
    }

    static async deletelikeComment(commentId){
        // 删除与该评论相关的所有点赞信息，并检查每个点赞信息的 ifread 字段
        const relatedLikeComments = await this.getCommentLikesFromAcomment(commentId);
        await this.deleteCommentNotification(relatedLikeComments);     
    }

    static async deleteReplyNotification(relatedLikeReply){
        for (const likeReply of relatedLikeReply) {
            const ifread = likeReply.ifread;
            // 删除点赞信息
            await likeReply.destroy();

            // 如果点赞信息的 ifread 字段为 1，则更新通知
            if (ifread === 1) {
                const post_id = await this.getPostIdByCommentId(likeReply.comment_id);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, false);
            }
        }
    }

    static async deleteLikeReply(replyId){
        // 删除与该评论相关的所有点赞信息，并检查每个点赞信息的 ifread 字段
        const relatedLikeReply = await db.likereply.findAll({
            where: {
                reply_id: replyId
            }
        });
        await this.deleteReplyNotification(relatedLikeReply);
    }

    static async deleteAllRealtedReply(commentId){
        // 删除与该评论相关的所有回复，并检查每个回复的 ifread 字段
        const relatedReplies = await db.reply.findAll({
            where: {
                comment_id: commentId
            }
        });

        for (const reply of relatedReplies) {
            const ifread = reply.ifread;
            const replyId = reply.id;

            // 如果回复的 ifread 字段为 1，则更新通知
            if (ifread === 1) {
                const post_id = await this.getPostIdByCommentId(commentId);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, false);
            }

            // 删除回复相关的点赞信息
            await this.deleteLikeReply(replyId);
            
            // 删除回复
            await reply.destroy();
        }
    }

    static async deleteComment(commentId) {
        try {
            // 检查是否存在该评论
            const comment = await db.comment.findByPk(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }

            // 获取评论的 ifread 字段的值
            const ifread = comment.ifread;
    
            // 更新通知（如果 ifread 字段的值为 1）
            if (ifread === 1) {
                const post_id = await this.getPostIdByCommentId(commentId);
                const ownerTeam_id = await this.getOwnerTeamIdByPostId(post_id);
                await this.updateNotification(post_id, ownerTeam_id, false);
            }

            // 删除与该评论相关的所有点赞信息
            await this.deletelikeComment(commentId);
    
            // 删除与该评论相关的所有回复
            await this.deleteAllRealtedReply(commentId);

            // 删除评论
            const deletedComment = await db.comment.destroy({
                where: {
                    id: commentId
                }
            });

            return deletedComment;
        } catch (error) {
            throw error;
        }
    }

    static async savePostImg(image){
        try {
            const imagePath = path.join(__dirname, 'uploads');
            const imageUrl = `/uploads/${image.filename}`;

            console.log("debug path:", imageUrl);
            // 将上传的图片保存到本地文件系统
            await fs.writeFile(imagePath, image.originalname);
            
            return imageUrl;
        } catch (error) {
            throw error;
        }
    }

    static async getNoticeNum(team_id) {
        try {
            // 在这里查询数据库，计算通知的数量
            const notifications = await db.notification.findAll({ where: { team_id } });
            var noticeNum = 0;
            for(const notification of notifications){
                var tmp = notification.num;
                noticeNum += tmp;
            }
            return {notice_num:noticeNum};
        } catch (error) {
            throw error;
        }
    }

    static async delNotice(team_id, post_id){
        const notification = await db.notification.findOne({
            where:{
                team_id : team_id, 
                post_id : post_id
            }
        });
        //console.log(notification.dataValues);
        if(notification.num == 0){
            return;
        }

        // -更新通知
        notification.num = 0;
        notification.save();
        
        // -点赞帖子的ifread全部置0
        await db.likepost.update(
            {ifread : 0}, 
            {
                where:{
                    post_id : post_id
                }
            });
              
        // -点赞评论的ifread全部置0
        const allComments = await commentService.getCommentsofPost(post_id); 
            //console.log(allComments);
        const allCommentLikes = await this.getCommentLikesFromComments(allComments);  
            //console.log(allCommentLikes);
        for (const commentLikeArray of allCommentLikes) {
            for (const like of commentLikeArray) {
                like.ifread = 0;
                like.save();
            }
        }
        // -评论的ifread全部置0
        for(const comment of allComments){
            comment.ifread = 0;
            comment.save();
        }

        // -点赞回复的ifread全部置0
        const allReplies = await replyService.getAllRepliesFromComments(allComments);
            //console.log(allReplies);
        const allReplyLikes = await replyService.getReplyLikesFromReplies(allReplies);
            //console.log(allReplyLikes);
        for(const replies of allReplyLikes){
            for(const like of replies){
                like.ifread = 0;
                like.save();
            }
        }

        // -回复的ifread全部置0
        for(const repliesOfAComment of allReplies){
            for(const reply of repliesOfAComment){
                reply.ifread = 0;
                reply.save();
            }
        }
    }
    
}


module.exports = postService;
