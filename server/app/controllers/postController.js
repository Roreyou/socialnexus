//controllers/postController.js

const postService = require('../services/postService');
const commentService = require('../services/commentService');
const Result = require('../common/Result');


class postController{
    static async createPost(req, res){
        try {
            // 获取客户端提交的帖子数据
            const postData = req.body;

            // 调用服务层函数来创建帖子
            const postId = await postService.createPost(postData);
    
            // 返回成功响应
            res.status(200).json({
                code: 0,
                msg: "Success",
                data: {postId:postId}
            });
        } catch (error) {
            // 处理异常情况
            console.error('Error:', error);
            res.status(500).json({
                code: -1,
                msg: "Failed to create post",
                data: null
            });
        }
    }
    static async getPostDetails(req, res){
        try {
            const {post_id, team_id} = req.query;

            // 调用服务层方法获取帖子详情和评论列表
            const post = await postService.getPostDetails(post_id);
            const comments = await commentService.getCommentsForPost(post_id);

            // 构造响应对象
            const result =  {
                post_detail: post,
                ...comments
            };
            // 返回响应给客户端
            return res.json(Result.success(result));
        } catch (error) {
            console.error('Error fetching post details:', error);
            res.status(500).json({ code: 'error', msg: 'Internal Server Error' });
        }
    }
    static async getHit(req, res){
        try {
            const {page} = req.query;
            // 调用服务层方法获取热门帖子
            const posts = await postService.getHotPosts(page);
            console.log("debug res:",posts);
            // 返回帖子列表
            return res.json(Result.success(posts));
        } catch (error) {
            console.error('Error fetching hot posts:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async getSameAreaPosts(req, res){
        const {province, city, page} = req.query;
        try {
            // 调用服务层方法获取同区域帖子
            const posts = await postService.getSameAreaPosts(province, city, page);
            
            // 返回帖子列表
            return res.json(Result.success(posts));
        } catch (error) {
            console.error('Error fetching same area posts:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async getLatestPosts(req, res){
        try {
            const {page} = req.query;
            // 调用服务层方法获取最新帖子
            const posts = await postService.getLatestPosts(page);
            
            // 返回帖子列表
            return res.json(Result.success(posts));
        } catch (error) {
            console.error('Error fetching latest posts:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async commentOnPost(req, res){
        try {
            const { post_id, text, team_id } = req.body;
    
            // 调用评论服务层方法
            const { comment_list } = await commentService.commentOnPost(post_id, team_id, text);
    
            return res.json(Result.success(comment_list));
        } catch (error) {
            console.error('Error commenting on post:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async likePost(req, res){
        const { post_id, team_id } = req.query;
        try {
            const updatedPost = await postService.likePost(post_id, team_id);
            return res.json(Result.success(updatedPost));
        } catch (error) {
            console.error('Error liking post:', error);
            return res.json(Result.fail(error.message));
        }
    }

}

module.exports = postController;