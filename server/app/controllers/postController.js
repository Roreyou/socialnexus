//controllers/postController.js

const postService = require('../services/postService');
const commentService = require('../services/commentService');


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
            const {post_id:postId} = req.query;
            console.log("postid:",postId);
            // 调用服务层方法获取帖子详情和评论列表
            const post = await postService.getPostDetails(postId);
            const comments = await commentService.getCommentsForPost(postId);

            // 构造响应对象
            const response = {
                code: 'success',
                msg: 'Post details retrieved successfully',
                data: {
                    post_detail: post,
                    ...comments
                }
            };
    
            // 返回响应给客户端
            res.json(response);
        } catch (error) {
            console.error('Error fetching post details:', error);
            res.status(500).json({ code: 'error', msg: 'Internal Server Error' });
        }
    }
    static async getHit(req, res){
        try {
            // 调用服务层方法获取热门帖子
            const posts = await postService.getHotPosts();
            // 返回帖子列表
            res.json(posts);
        } catch (error) {
            console.error('Error fetching hot posts:', error);
            res.status(500).json({ code: 'error', msg: 'Internal Server Error' });
        }
    }
    static async getSameAreaPosts(req, res){
        const {province, city} = req.query;
        try {
            // 调用服务层方法获取同区域帖子
            const posts = await postService.getSameAreaPosts(province, city);
            
            // 返回帖子列表
            res.json(posts);
        } catch (error) {
            console.error('Error fetching same area posts:', error);
            res.status(500).json({ code: 'error', msg: 'Internal Server Error' });
        }
    }
    static async getLatestPosts(req, res){
        try {
            // 调用服务层方法获取最新帖子
            const posts = await postService.getLatestPosts();
            
            // 返回帖子列表
            res.json(posts);
        } catch (error) {
            console.error('Error fetching latest posts:', error);
            res.status(500).json({ code: 'error', msg: 'Internal Server Error' });
        }
    }
    static async commentOnPost(req, res){
        try {
            const { post_id, text, team_id } = req.query;
    
            // 调用评论服务层方法
            const { comment_list } = await commentService.commentOnPost(post_id, team_id, text);
    
            res.json({ code: 200, msg: 'Comment posted successfully', data: {  comment_list } });
        } catch (error) {
            console.error('Error commenting on post:', error);
            res.status(500).json({ code: 2, msg: 'Internal Server Error' });
        }
    }
}

module.exports = postController;