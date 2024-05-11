// services/commentService.js

const db = require('../models/index');
const replyService = require('../services/replyService');
const { Op } = require('sequelize');
const teamService = require('./teamService');
const postService = require('./postService');

class commentService{
    static async getCommentsofPost(post_id){
        // 返回结构：[{a comment},...,{a comment}}] of a post
        try {
            // 获取新的评论详情
            const new_comments = await db.comment.findAll({ where: { post_id: post_id } });
            return new_comments;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching comments of post');
        }
    }

    static async getCommentsForPost(post_id) {
        try {
            // 获取新的评论详情以及相关的回复详情
            const new_comments = await db.comment.findAll({ where: { post_id: post_id } });

            const CommentList = await Promise.all(new_comments.map(async (comment) => {
                // 对每条评论查询对应的回复列表                
                const replies = await replyService.getReplyOfAComment(comment.id);
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

    static async getCommentHandled(commentLists, team_id){
         console.log("debug commentLists:", commentLists);
         // 遍历评论列表
         const results = await Promise.all(commentLists.map(async commentList => {
            console.log("debug commentList111:", commentList);
            const comment_detail = commentList.comment_detail;
            const reply_list = commentList.reply_list;
            
            //查看有没有点赞评论
            const flag = await db.likecomment.findOne({
                where: {
                    team_id: comment_detail.team_id,
                    comment_id: comment_detail.id
                }
            });

            //获取队伍头像
            const team_avatar = await db.team.findOne({
                where: {
                id: comment_detail.team_id
                },
                attributes:['avatar'] 
            });
                
            // 增加评论详情字段
            const comment_result= {
                ...comment_detail,
                fabulous: flag ? true : false, 
                team_avatar: team_avatar ? team_avatar.avatar : null, // 假设都是一样的team_avatar
                del_flag: team_id == comment_detail.team_id ? true : false // 假设都是del_flag
            };

            // 遍历回复列表
            const reply_result = await Promise.all(reply_list.map(async reply => {
                //获取队伍头像
                const team_avatar = await db.team.findOne({
                    where: {
                    id: reply.reply_id
                    },
                    attributes:['avatar'] 
                });

                //查看有没有点赞回复
                const flag = await db.likereply.findOne({
                    where: {
                        team_id: reply.reply_id,
                        reply_id: reply.id
                    }
                });

                // 增加回复字段
                return {
                    ...reply,
                    team_avatar: team_avatar ? team_avatar.avatar : null, 
                    fabulous: flag ? true : false, 
                }; 
            }));
            return {
                comment_detail : comment_result,
                reply_list : reply_result
            }
        }));
        console.log("debug results:",results);
        return {comment_list : results};
    }

    static async getDetailedCommentsForPost(post_id, team_id){
        const comments = await this.getCommentsForPost(post_id);
        const results = await this.getCommentHandled(comments.comment_list, team_id);
        return results;
    }
    static async commentOnPost(post_id, team_id, text){
        try {
            // 创建新的评论
             const debug = await db.comment.create({
                post_id: post_id,
                team_id: team_id,
                content: text,
                time: new Date(),
                like: 0,
                ifread: 1
            });

            // 更新在notification表里面
            await postService.updateNotification(post_id, true);

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
