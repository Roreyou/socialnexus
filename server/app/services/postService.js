// services/postService.js

const db = require('../models/index');
const { Op } = require('sequelize');

class postService{
    static async createPost(postData) {
        try {
            // 获取客户端提交的帖子数据
    
            // 添加缺失的字段
            postData.like = 0;
            console.log(postData);
                    // 确保 postData.picture 是一个数组
            if (!Array.isArray(postData.picture)) {
                // 如果不是数组，则将其转换为数组
                postData.picture = [postData.picture];
            }

            // 将前端传递的数组形式的图片链接转换为逗号分隔的字符串
            postData.picture = postData.picture.join(',');

            // 添加缺失的字段
            postData.like = 0;
            // 调用服务层函数来创建帖子
            const newPost = await db.post.create(postData);
    
            // 返回成功响应
            return newPost.id;
        } catch (error) {
            // 处理异常情况
            throw error;
        }
    }
}


module.exports = postService;
