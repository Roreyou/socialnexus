// services/commentService.js

const db = require('../models/index');
const replyService = require('../services/replyService');
const { Op } = require('sequelize');

class commentService{
    static async getCommentsForPost(postId) {
        try {
            const comments = await db.comment.findAll({ where: { post_id: postId } });
            // 对每条评论查询对应的回复列表
            for (const comment of comments) {
                const replies = await replyService.getReplyForComment(comment.id);
                comment.replies = replies;
            }
            return comments;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching comments for post');
        }
    }
}


module.exports = commentService;
