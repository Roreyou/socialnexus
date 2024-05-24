// services/postService.js
const db = require('../models/index');
const sequelize = require('sequelize');

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
            result.post_time = await otherService.changeTimeFormat(result.post_time);
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
            const team_avatar = await otherService.getTeamAvatar(post.team_id);
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
            // 假设 province 和 city 是从某个地方获取的变量
            let whereConditions = {};
            
            // 如果 province 不是 null，则添加 province 条件
            if (province !== '') {
                whereConditions.province = province;
            }
            // 如果 city不是 null，则添加 city 条件
            if (city !== '') {
                whereConditions.city = city;
            }
            // 调用数据库查询方法获取同区域帖子
            const posts = await db.post.findAll(
               { where: whereConditions});

            // 处理每个 post 的 picture 字段，将其转换为数组
            const processedPosts = await Promise.all(posts.map(async post => {
                // 将逗号分隔的图片链接字符串转换为数组
                post.picture = await post.picture.split(',');
                // 调用服务来改变时间格式
                const newTimeFormat =await  otherService.changeTimeFormat(post.post_time);
                post.dataValues.post_time = newTimeFormat;
                return post;
            }));
            
            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(processedPosts);  
            // 分页
            const pageResults = await otherService.getPageData(page, results);
            return {location_post_list:pageResults};
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
            // 处理每个 post 的 picture 字段，将其转换为数组
            const processedPosts = await Promise.all(posts.map(async post => {
                // 将逗号分隔的图片链接字符串转换为数组
                post.picture = await post.picture.split(',');
                // 调用服务来改变时间格式
                const newTimeFormat =await  otherService.changeTimeFormat(post.post_time);
                post.dataValues.post_time = newTimeFormat;
                return post;
            }));
            
            //处理：队伍名映射、获取评论条数、获取队伍头像的统一接口
            const results = await this.getPostsHandled(processedPosts);
            // 分页
            const pageResults = await otherService.getPageData(page, results);
            return {hot_post_list:pageResults};
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
                // 将逗号分隔的图片链接字符串转换为数组
                post.picture = await post.picture.split(',');
                // 调用服务来改变时间格式
                const newTimeFormat =await  otherService.changeTimeFormat(post.post_time);
                post.dataValues.post_time = newTimeFormat;
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
    static async likePost(post_id, team_id){ //teamid是要点赞的队伍
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
                if(post.like != 0){
                    post.like -= 1;
                }else{
                    console.log("出错啦 帖子点赞数已经为0啦");
                }
                
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
            console.log(comment_id);
            console.log(team_id);//点赞人的id
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
                        //team_id: team_id //本来应该是该评论的评论者的id，但这里不需要，且teamid是点赞人的id
                    }
                });
                console.log("debug 5");
                console.log(comment);
                if (!comment) {
                    //如果这条评论不存在，会报错
                    throw new Error('Comment not found');
                }
                console.log("debug 06");
                if(comment.like != 0){
                    comment.like -= 1;
                }else{
                    console.log("出错啦 这条点赞已经为0了")
                }
               
                console.log("debug 077");
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
                        //team_id: team_id //本来应该是该评论的评论者的id，但这里不需要，且teamid是点赞人的id
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
                if(reply.like != 0){
                    reply.like -= 1;
                }else{
                    console.log("出错啦 这条点赞已经为0了");
                }
                
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

    static async getPostLikesByPostId(postId,flag=true){
        //如果flag为false，则仅获取isfread字段为1的
        try {
            var whereCondition={post_id: postId};
            if(!flag){
                whereCondition={ post_id: postId, ifread:1 };//只返回ifread字段为1的评论
            }

            // 从数据库中获取给定帖子 ID 的所有点赞
            const postLikes = await db.likepost.findAll({ where: whereCondition   });
            // 返回点赞数组
            return postLikes;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getPostLikesByPosts(allPosts,flag=true){
        // 返回结构：[[{likepost},...,{likepost}],...,[{likepost},...,{likepost}]]
        
        const postLikes = [];
        for(const post of allPosts){
            const like = await postService.getPostLikesByPostId(post.id,flag);
            postLikes.push(like);
        }
        return postLikes;
    }

    static async getAllPostsByTeamId(team_id){
        // 返回结构：[{team},...,{team}]
        try {
            console.log("debug teamid:",team_id);
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
            console.log("debug 011");
            const allPosts = await postService.getAllPostsByTeamId(team_id);
            console.log("debug 012");
            //获取所有帖子下的所有ifread为1的评论（即未读的评论）
            const commentsOfAllPosts = await commentService.getCommentsofAllPosts(allPosts, false);
            console.log("debug 01");
            const ReturnComments = [];
            const ReturnReplies = [];
            const likeReplyList = [];
            for(const commentsOfAPost of commentsOfAllPosts){
                for(const comment of commentsOfAPost){
                    //console.log("debug 02");
                    const teamName = await teamService.getTeamName(comment.team_id);
                    const teamAvatar = await otherService.getTeamAvatar(comment.team_id);
                    //console.log("debug 03");
                    // 创建一个新的对象，将原始评论对象和团队信息合并
                    comment.dataValues.time = await otherService.changeTimeFormat(comment.dataValues.time );
                    const updatedComment = {
                        ...comment.dataValues,
                        team_name: teamName.team_name,
                        team_avatar: teamAvatar.avatar
                    };
                    ReturnComments.push(updatedComment);
                    //console.log(updatedComment);
                    //console.log("debug 99");
                    
                    // 获取该评论的回复列表,isread为1
                    const replies = await db.reply.findAll({ where: { comment_id: updatedComment.id, ifread:1 },
                        attributes: {
                            include: [
                                [
                                //引用原生mySQL语法，将类型转化
                                sequelize.literal("cast(id as char)"),
                                'id'
                                ],
                            ]
                        }
                    });
                    //console.log("debug 101");
                    
                    for(const reply of replies){
                        const replyName = await teamService.getTeamName(reply.reply_id);
                        const replyAvatar = await otherService.getTeamAvatar(reply.reply_id);
                        reply.dataValues.time = await otherService.changeTimeFormat(reply.dataValues.time);
                        const updatedReply = {
                            ...reply.dataValues,
                            team_name: replyName.team_name,
                            team_avatar: replyAvatar.avatar
                        };
                        ReturnReplies.push(updatedReply);
                    }
                    console.log("debug 100");
                    //该用户的评论下所有的回复（包含已读或未读，因为这个点赞无关）
                    const Allreplies = await db.reply.findAll({ where: { comment_id: comment.id},
                        attributes: {
                            include: [
                                [
                                //引用原生mySQL语法，将类型转化
                                sequelize.literal("cast(id as char)"),
                                'id'
                                ],
                            ]
                        }
                    });
                    console.log("debug 200");
                    //回复的点赞，ifread为1的
                    //const relatedLikeReply = await replyService.getReplyLikesFromReplies(Allreplies,false);
                    
                    var relatedLikeReply = [];
                    for(const reply of Allreplies){
                        //console.log(reply);
                        var whereCondition={ reply_id: reply.dataValues.id, ifread:1 };
                        //console.log("debug 400");
                        //console.log(whereCondition);
                        const replyLike = await db.likereply.findAll({ where: whereCondition});
                        relatedLikeReply.push(replyLike);
                    }                    
                    console.log("debug 300");
                    for(const oneReplyLikes of relatedLikeReply){
                        console.log(oneReplyLikes);
                        //console.log("debug 071");
                        for(const alike of oneReplyLikes){
                            console.log(alike);
                            const like = alike.dataValues;
                            console.log(like);
                            const teamName = await teamService.getTeamName(like.team_id);
                            const teamAvatar = await otherService.getTeamAvatar(like.team_id);
                            const commentId = await commentService.getCommentIdByReplyId(like.reply_id);
                            const postId = await postService.getPostIdByCommentId(commentId);
                            console.log(teamName);
                            console.log(teamAvatar);
                            console.log(postId);
                            console.log("---");
                            console.log(teamName.dataValues.team_name);
                            console.log(teamAvatar.dataValues.avatar);

                            const updateLike = {
                                team_name : teamName.dataValues.team_name,
                                time: await otherService.changeTimeFormat(like.liketime),
                                post_id: postId,
                                team_avatar: teamAvatar.dataValues.avatar
                            };
                            //console.log(updateLike);
                            console.log("debug 07777777");
                            likeReplyList.push(updateLike);
                            console.log("debug 088888");
                        }
                    }
                    
                    console.log("debug 05");
                }
            }
            console.log("debug 06");

            // 查询点赞列表
            const likePostList = [];
            const likeCommentList = [];
            
            //帖子的点赞，ifread为1的
            const postLikes = await postService.getPostLikesByPosts(allPosts,false);
            for(const onePostLikes of postLikes){
                console.log("debug 07222222");
                for(const like of onePostLikes){
                    const teamName = await teamService.getTeamName(like.team_id);
                    const teamAvatar = await otherService.getTeamAvatar(like.team_id);
                    const updateLike = {
                        team_name : teamName.team_name,
                        time: await otherService.changeTimeFormat(like.liketime),
                        post_id: like.post_id.toString(),
                        team_avatar: teamAvatar.avatar
                    };
                    likePostList.push(updateLike);
                    //console.log("debug 088888");
                }
            }
            //console.log("debug 09");

            
            //该用户的帖子下所有的评论（包含已读或未读，因为这个点赞无关）
            const comments = await commentService.getCommentsofAllPosts(allPosts, true);
            //console.log("debug 081");

            //评论的点赞，ifread为1的
            //const relatedLikeComments = await postService.getCommentLikesByComments(comments,false);
            var relatedLikeComments = [];
            for (const commentsOfPosts of comments) {
                for(const comment of commentsOfPosts){
                    //console.log("debug comm111",comment);
                    // 获取每个评论的点赞信息
                    const LikeComments =  await db.likecomment.findAll({
                        where: {
                            ifread:1,
                            comment_id:comment.id
                        }
                    });;
                    //console.log("debug likecomm222",LikeComments);
                    // 将每个评论的点赞信息加入到结果数组中
                    relatedLikeComments.push(LikeComments);
                }
            }

            for(const oneCommentLikes of relatedLikeComments){
                console.log("debug 073");
                for(const alike of oneCommentLikes){
                    const like = alike.dataValues;
                    const teamName = await teamService.getTeamName(like.team_id);
                    const teamAvatar = await otherService.getTeamAvatar(like.team_id);
                    //console.log("debug hhhh:",like);

                    const postId = await postService.getPostIdByCommentId(like.comment_id);
                    const updateLike = {
                        team_name : teamName.team_name,
                        time: await otherService.changeTimeFormat(like.liketime),
                        post_id: postId,
                        team_avatar: teamAvatar.avatar
                    };
                    likeCommentList.push(updateLike);
                    //console.log("debug 08");
                }
            }
            //console.log("debug 09");

            return { comment_list: ReturnComments, reply_list:ReturnReplies, likePost_list: likePostList, likeComment_list:likeCommentList, likeReply_list:likeReplyList};
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
            // 遍历回复列表
            const reply_result = await Promise.all(newReply.map(async reply => {
            //获取队伍信息
            const team = await db.team.findOne({
                where: {
                id: reply.reply_id
                } 
            });

            //查看有没有点赞回复
            const flag = await db.likereply.findOne({
                where: {
                    team_id: reply.reply_id,
                    reply_id: reply.id
                }
            });

            // 增加回复字段
            return {
                ...reply.dataValues,
                team_avatar: team ? team.avatar : null, 
                reply_name:team ? team.team_name : null,
                fabulous: flag ? true : false, 
            }; 
        }));

            return reply_result;
        } catch (error) {
            throw error;
        }
    }

    static async getCommentLikesByAcomment(commentId, flag=true){
        console.log("debug comId:",commentId);
        var whereCondition={
            comment_id: commentId
        };
        if(!flag){
            whereCondition={
                comment_id: commentId,
                ifread:1
            };//只返回ifread字段为1的评论
        }

        const relatedLikeComments = await db.likecomment.findAll({
            where: whereCondition
        });
        return relatedLikeComments;
    }

    static async getCommentLikesByComments(comments, flag=true){
        // 返回结构：[[{likecomment},...,{likecooment}],...,[{likecomment},...,{likecooment}] ]
        // 最外层元素是不同的comments，内层数组的不同元素是同一个comment的不同点赞信息
        var commentLikes = [];
        for (const comment of comments) {
            // 获取每个评论的点赞信息
            const relatedLikeComments = await this.getCommentLikesByAcomment(comment.id, flag);

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
        console.log("debug 通知数量:",notification.num);
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
