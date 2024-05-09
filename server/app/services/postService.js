// services/postService.js

const { where } = require('sequelize');
const db = require('../models/index');
const ActivityService = require('./activityService');
const teamService = require('./teamService');
const otherService = require('./otherService');
const fs = require('fs/promises');
const path = require('path');

class postService{
    static async createPost(postData){
        try {
            // 将数组形式的图片链接转换为逗号分隔的字符串
            const pictureString = postData.picture.join(',');
            // 将转换后的字符串赋值给 postData.picture
            postData.picture = pictureString;
            const newPost = await db.post.create(postData); // 在数据库中创建新的帖子
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

    static async createReply(comment_id, reply_content, team_id){
        try {
            console.log("debug team_id:", team_id);
            const reply = await db.reply.create({
                comment_id: comment_id,
                reply_id: team_id,
                content: reply_content,
                time: await otherService.getCurrentTime(),
                like: 0
            });
            // 获取该评论的新的回复列表

            return reply;
        } catch (error) {
            throw error;
        }
    }

    static async deleteComment(commentId) {
        try {
            const deletedComment = await db.comment.destroy({
                where: {
                    id: commentId
                }
            });
            console.log("debug delete:",deletedComment);
            return deletedComment;
        } catch (error) {
            throw error;
        }
    }

    static async savePostImg(post_id, image){
        try {
            const imagePath = path.join(__dirname, 'uploads', image.filename);
            const imageUrl = `/uploads/${image.filename}`;

            console.log("debug path:", imagePath);
            // 将上传的图片保存到本地文件系统
            await fs.writeFile(imagePath, image.originalname);

            // 创建帖子并保存图片信息到数据库
            // 查找帖子
            const post = await db.post.findById(post_id);
            if (!post) {
                throw new Error('Post not found');
            }

            // 更新帖子的图片信息
            post.picture = imageUrl;
            await post.save();
            
            return { postId: post.id, imageUrl: imageUrl };
        } catch (error) {
            throw error;
        }
    }
    
}


module.exports = postService;
