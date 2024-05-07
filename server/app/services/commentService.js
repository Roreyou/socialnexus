// services/commentService.js

const db = require('../models/index');
const replyService = require('../services/replyService');
const { Op } = require('sequelize');
const teamService = require('./teamService');

class commentService{
    static async getCommentsForPost(post_id) {
        try {
            // 获取新的评论详情以及相关的回复详情
            const new_comments = await db.comment.findAll({ where: { post_id: post_id } });

            const CommentList = await Promise.all(new_comments.map(async (comment) => {
                // 对每条评论查询对应的回复列表                
                const replies = await replyService.getReplyForComment(comment.id);
                const replyDetailList = await Promise.all(replies.map(async (reply) => {
                    // 查询回复对应的队伍信息
                    const replyTeam = await db.team.findByPk(reply.reply_id);
                    return {
                        ...reply.dataValues,
                        reply_name: replyTeam ? replyTeam.team_name : null
                    };
                }));
                
                const Commentteam = await db.team.findByPk(comment.team_id);
                
                const commentDetail = {
                    ...comment.dataValues,
                    my_name: Commentteam ? Commentteam.team_name : null,
                    reply_list_length: replyDetailList.length // 添加回复列表长度字段
                };
                
                return { comment_detail: commentDetail, reply_list: replyDetailList };
            }));

            return { comment_list: CommentList };
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching comments for post');
        }
    }

    static async commentOnPost(post_id, team_id, text){
        try {
            // 创建新的评论
             const debug = await db.comment.create({
                post_id: post_id,
                team_id: team_id,
                content: text,
                time: new Date(),
                like: 0
            });

            // 获取新的评论详情以及相关的回复详情
            const newCommentList = this.getCommentsForPost(post_id);

            return newCommentList;
        } catch (error) {
            console.log(error)
            throw new Error('Error commenting on post');
        }
    }
}


module.exports = commentService;
