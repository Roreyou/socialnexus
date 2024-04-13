// services/postService.js

const db = require('../models/index');

class postService{
    static async getPostDetails(postId){
        try {
            console.log(typeof postId)
            const post = await db.post.findByPk(postId);
            return post;
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

}


module.exports = postService;
