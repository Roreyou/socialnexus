// services/replyService.js

const db = require('../models/index');
const { Op } = require('sequelize');

class replyService{
    static async getReplyOfComment(commentId) {
        try {
            const replies = await db.reply.findAll({ where: { comment_id: commentId } });
            return replies;
        } catch (error) {
            throw new Error('Error fetching replies for comment');
        }
    }
}


module.exports = replyService;
