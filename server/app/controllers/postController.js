//controllers/postController.js

const postService = require('../services/postService');

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
}

module.exports = postController;