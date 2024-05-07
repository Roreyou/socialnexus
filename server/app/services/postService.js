// services/postService.js

const activity = require('../models/activity');
const db = require('../models/index');
const ActivityService = require('./activityService');
const teamService = require('./teamService');

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
            const postteam = await db.team.findByPk(post.team_id);
            post.picture = post.picture.split(','); // 将逗号分隔的图片链接字符串转换为数组
            const result = this.getPostsHandled([post]);
            
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

    // 给帖子点赞
    static async likePost(postId){
        try {
            const post = await db.post.findByPk(postId);
            if (!post) {
                throw new Error('Post not found');
            }    
            // 更新点赞数
            post.like += 1;
            await post.save();
    
            return post;
        } catch (error) {
            throw new Error('Error liking post');
        }
    }

}


module.exports = postService;
