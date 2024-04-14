// services/postService.js

const db = require('../models/index');

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
            return {
                ...post.dataValues,
                team_name: postteam ? postteam.team_name : 'Unknown Team'
            };
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching post details');
        }
    }
    // 获取同区域帖子
    static async getSameAreaPosts(province, city) {
        try {
            // 调用数据库查询方法获取同区域帖子
            const posts = await db.post.findAll({
                where: {
                    province:province,
                    city: city
                }
            });
            return posts;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching same area posts');
        }
    }

    // 获取热门帖子
    static async getHotPosts() {
        try {
            // 调用数据库查询方法获取热门帖子
            const posts = await db.post.findAll({
                order: [['like', 'DESC']],
                limit: 100
            });
            return posts;
        } catch (error) {
            throw new Error('Error fetching hot posts');
        }
    }

    // 获取最新帖子
    static async getLatestPosts() {
        try {
            // 调用数据库查询方法获取最新帖子
            // 按照发布时间降序排列，取前10条数据
            const posts = await db.post.findAll({
                order: [['post_time', 'DESC']],
                limit: 100
            });
            return posts;
        } catch (error) {
            throw new Error('Error fetching latest posts');
        }
    }

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
