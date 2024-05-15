// services/replyService.js

const db = require('../models/index');
const sequelize = require('sequelize');

class replyService{
    static async getReplyOfAComment(commentId) {
        try {
            const replies = await db.reply.findAll({ where: { comment_id: commentId },
                attributes: {
                    include: [
                        [
                        //引用原生mySQL语法，将类型转化
                        sequelize.literal("cast(id as char)"),
                        'id'
                        ],
                    ]
                }
            });
            return replies;
        } catch (error) {
            throw new Error('Error fetching replies for comment');
        }
    }

    static async getAllRepliesFromComments(allComments){
        //返回结构：[[{reply},...,{}],...,[{reply},...,{}]]
        //最外层的元素是不同的comment对应的回复，内层数组是同一个comment下的所有回复
        var Replies = [];
        for (const comment of allComments) {
            const reply = await this.getReplyOfAComment(comment.id);
            Replies.push(reply);
        }

        return Replies; 
    }

    static async getReplyLikesFromReplies(allReplies){
        //返回结构：[[{likereply},...,{}],...,[{likereply},...,{}]]
        //最外层的元素是不同的reply，内层数组是同一个reply下的所有点赞信息
        var replyLikes = [];
        for (const repliesOfAComment of allReplies) {
            for(const reply of repliesOfAComment){
                const replyLike = await db.likereply.findAll({ where: { reply_id: reply.id } });
                replyLikes.push(replyLike);
            }
        }
        return replyLikes; 
    }
}


module.exports = replyService;
