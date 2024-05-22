// services/postService.js
const db = require('../models/index');

const replyService = require('./replyService');
const commentService = require('./commentService');
const imageService = require('./imageService');
const teamService = require('./teamService');
const otherService = require('./otherService');

class postService{
    static async createPost(postData){
        try {
            // 将数组形式的图片链接转换为逗号分隔的字符串
            const pictureString = postData.picture.join(',');
            // 将转换后的字符串赋值给 postData.picture
            postData.picture = pictureString;
            const newPost = await db.post.create(postData); // 在数据库中创建新的帖子
            // 补充 postTime 字段
            newPost.post_time = await otherService.getCurrentTime();

            // 将 like 字段设置为 0
            newPost.like = 0;
            await newPost.save();
            return newPost.id.toString(); // 返回新创建帖子的ID

        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Error creating post');
        }
    }
    static async getPostDetails(postId){
        try {
            const post = await db.post.findByPk(postId);
            post.picture = post.picture.split(','); // 将逗号分隔的图片链接字符串转换为数组
            const tmp = await postService.getPostsHandled([post]);

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
            post = await otherService.IdInt2String("id", post.dataValues);           
            const team_name = await teamService.getTeamName(post.team_id);

            // 统计评论数量
            const commentCount = await db.comment.count({
                where: {
                    post_id: post.id
                }
            });

            //获取队伍头像
            const team_avatar = await teamService.getTeamAvatar(post.team_id);
            return {
                ...post,
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

            // 处理每个 post 的 picture 字段，将其转换为数组
            const processedPosts = await Promise.all(posts.map(async post => {
                post.picture = post.picture.split(','); // 将逗号分隔的图片链接字符串转换为数组
                return post;
            }));

            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(processedPosts);  
            // 分页
            const pageResults = await otherService.getPageData(page, results);
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
            console.log("debug 02:",posts);
            // 处理每个 post 的 picture 字段，将其转换为数组
            const processedPosts = await Promise.all(posts.map(async post => {
                post.picture = post.picture.split(','); // 将逗号分隔的图片链接字符串转换为数组
                return post;
            }));
            console.log("debug 01:",processedPosts);
            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(processedPosts);
            // 分页
            const pageResults = await otherService.getPageData(page, results);
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

            // 处理每个 post 的 picture 字段，将其转换为数组
            const processedPosts = await Promise.all(posts.map(async post => {
                post.picture = post.picture.split(','); // 将逗号分隔的图片链接字符串转换为数组
                return post;
            }));


            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(processedPosts);
            //分页
            const pageResults = await otherService.getPageData(page, results);
            return pageResults;
        } catch (error) {
            throw new Error('Error fetching latest posts');
        }
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
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id,ownerTeam_id, false);

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
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id,ownerTeam_id, true);
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
            console.log("debug 04");
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
                console.log("debug 5");
                if (!comment) {
                    //如果这条评论不存在，会报错
                    throw new Error('Comment not found');
                }
                console.log("debug 06");
                comment.like -= 1;
                console.log("debug 07");
                await comment.save();
                //更新通知：
                console.log("debug 08");
                const post_id = await postService.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, false);
                return "unlike successfully!";

            } else {
                // 如果未点赞，则进行点赞，创建点赞记录，增加点赞数
                await db.likecomment.create({
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
                const post_id = await postService.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, true);
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
                const comment_id = await commentService.getCommentIdByReplyId(reply_id);
                const post_id = await postService.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, false);
    
                return "unlike successfully!";
            } else {
                // 如果未点赞，则进行点赞，创建点赞记录，增加点赞数
                await db.likereply.create({
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
                console.log("Debug 01");
                if (!reply) {
                    throw new Error('Reply not found');
                }
                console.log("Debug 02");
                reply.like += 1;
                await reply.save();
                //更新通知：
                const comment_id = await commentService.getCommentIdByReplyId(reply_id);
                const post_id = await postService.getPostIdByCommentId(comment_id);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, true);
                return "like successfully!";
            }
        } catch (error) {
            throw new Error('Error liking reply');
        }
    }

    static async getPostLikesByPostId(postId){
        try {
            // 从数据库中获取给定帖子 ID 的所有点赞
            const postLikes = await db.likepost.findAll({ where: { post_id: postId },
            
            });
            // 返回点赞数组
            return postLikes;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getPostLikesByPosts(allPosts){
        // 返回结构：[[{likepost},...,{likepost}],...,[{likepost},...,{likepost}]]
        
        const postLikes = [];
        for(const post of allPosts){
            const like = await postService.getPostLikesByPostId(post.id);
            postLikes.push(like);
        }
        return postLikes;
    }

    static async getAllPostsByTeamId(team_id){
        // 返回结构：[{team},...,{team}]
        try {
            const posts = await db.post.findAll({ where: { team_id: team_id } });
            return posts;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching posts by team ID');
        }
    }

    static async getnotice(team_id) {
        try {
            //获取该队伍的所有帖子
            const allPosts = await postService.getAllPostsByTeamId(team_id);
            //console.log(allPosts);
            //获取所有帖子下的所有ifread为1的评论（即未读的评论）
            const commentsOfAllPosts = await commentService.getCommentsofAllPosts(allPosts, false);
            const ReturnComments = [];
            for(const commentsOfAPost of commentsOfAllPosts){
                for(const comment of commentsOfAPost){
                    const teamName = await teamService.getTeamName(comment.team_id);
                    const teamAvatar = await teamService.getTeamAvatar(comment.team_id);
                    // 创建一个新的对象，将原始评论对象和团队信息合并
                    const updatedComment = {
                        ...comment.dataValues,
                        team_name: teamName.team_name,
                        team_avatar: teamAvatar.avatar
                    };
                    ReturnComments.push(updatedComment);
                }
            }
   
            // 查询点赞列表
            const likeList = [];
            //帖子的点赞
            const postLikes = await postService.getPostLikesByPosts(allPosts);
            for(const onePostLikes of postLikes){
                for(const like of onePostLikes){
                    const teamName = await teamService.getTeamName(like.team_id);
                    const teamAvatar = await teamService.getTeamAvatar(like.team_id);
                    const updateLike = {
                        team_name : teamName.team_name,
                        time: like.liketime,
                        post_id: like.post_id.toString(),
                        team_avatar: teamAvatar.avatar
                    };
                    likeList.push(updateLike);
                }
            }
            return { comment_list: ReturnComments, like_list: likeList };
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
            const post_id = await postService.getPostIdByCommentId(comment_id);
            const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
            await otherService.updateNotification(post_id, ownerTeam_id, true);
            // 获取该评论的新的回复列表
            const newReply = await replyService.getReplyOfAComment(comment_id);
            return newReply;
        } catch (error) {
            throw error;
        }
    }

    static async getCommentLikesByAcomment(commentId){
        const relatedLikeComments = await db.likecomment.findAll({
            where: {
                comment_id: commentId
            }
        });
        return relatedLikeComments;
    }

    static async getCommentLikesByComments(comments){
        // 返回结构：[[{likecomment},...,{likecooment}],...,[{likecomment},...,{likecooment}] ]
        // 最外层元素是不同的comments，内层数组的不同元素是同一个comment的不同点赞信息
        var commentLikes = [];
        for (const comment of comments) {
            // 获取每个评论的点赞信息
            const relatedLikeComments = await this.getCommentLikesByAcomment(comment.id);

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
                const post_id = await postService.getPostIdByCommentId(likeComment.comment_id);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, false);
            }
        }
    }

    static async deletelikeComment(commentId){
        // 删除与该评论相关的所有点赞信息，并检查每个点赞信息的 ifread 字段
        const relatedLikeComments = await this.getCommentLikesByAcomment(commentId);
        await this.deleteCommentNotification(relatedLikeComments);     
    }

    static async deleteReplyNotification(relatedLikeReply){
        for (const likeReply of relatedLikeReply) {
            const ifread = likeReply.ifread;
            // 删除点赞信息
            await likeReply.destroy();

            // 如果点赞信息的 ifread 字段为 1，则更新通知
            if (ifread === 1) {
                const post_id = await postService.getPostIdByCommentId(likeReply.comment_id);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, false);
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
                const post_id = await postService.getPostIdByCommentId(commentId);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, false);
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
                const post_id = await postService.getPostIdByCommentId(commentId);
                const ownerTeam_id = await otherService.getOwnerTeamIdByPostId(post_id);
                await otherService.updateNotification(post_id, ownerTeam_id, false);
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
        const allComments = await commentService.getCommentsOfPost(post_id); 
            //console.log(allComments);
        const allCommentLikes = await this.getCommentLikesByComments(allComments);  
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
