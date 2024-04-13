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
                data: postId
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
            console.log(post);
            const comments = await commentService.getCommentsForPost(postId);

            // 构造响应对象
            const response = {
                code: 'success',
                msg: 'Post details retrieved successfully',
                data: {
                    post_detail: post,
                    comment_list: comments.map(comment => {
                        return {
                            comment_detail: {
                                ...comment.toJSON(),
                                replies: undefined
                            },
                            reply_list: comment.replies 
                        };
                    })
                }
            };
    
            // 返回响应给客户端
            res.json(response);
        } catch (error) {
            console.error('Error fetching post details:', error);
            res.status(500).json({ code: 'error', msg: 'Internal Server Error' });
        }
    }
}

module.exports = postController;