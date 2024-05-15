// services/commentService.js

const db = require('../models/index');
const replyService = require('../services/replyService');
const teamService = require('./teamService');
const postService = require('./postService');
const otherService = require('./otherService');
const comment = require('../models/comment');
const sequelize = require('sequelize');

class commentService{
    static async getCommentsofPost(post_id, flag=true){
        // 返回结构：[{a comment},...,{a comment}}] of a post
        // 如果flag为flase，则只返回ifread字段为1的评论
        try {
            var results;
            // 获取新的评论详情
            if(!flag){ //只返回ifread字段为1的评论
                console.log(flag);
                results = await db.comment.findAll({ where: { post_id: post_id, ifread:1 } });
            }else{ // 全返回
                results = await db.comment.findAll({ where: { post_id: post_id } });
            }
            return results;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching comments of post');
        }
    }

    static async getCommentsForPost(post_id) {
        try {
            // 获取新的评论详情以及相关的回复详情
            const new_comments = await db.comment.findAll({ where: { post_id: post_id },
                attributes: {
                    include: [
                        [
                        //引用原生mySQL语法，将类型转化
                        sequelize.literal("cast(id as char)"),
                        'id'
                        ],
                    ]
                }});
 
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
            
            //查看有没有该评论的点赞信息
            const flag = await db.likecomment.findOne({
                where: {
                    team_id: comment_detail.team_id,
                    comment_id: comment_detail.id
                }
            });

            //获取队伍头像
            const team_avatar = await teamService.getTeamAvatar(comment_detail.team_id);
                
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
             await db.comment.create({
                post_id: post_id,
                team_id: team_id,
                content: text,
                time: new Date(),
                like: 0,
                ifread: 1
            });

            // 更新在notification表里面
            const ownerTeam_id =  await otherService.getOwnerTeamIdByPostId(post_id);
            await otherService.updateNotification(post_id, ownerTeam_id, true);

            // 获取新的评论详情以及相关的回复详情
            const newCommentList = commentService.getCommentsForPost(post_id);

            return newCommentList;
        } catch (error) {
            console.log(error)
            throw new Error('Error commenting on post');
        }
    }

    static async getCommentsofAllPosts(allPosts, flag=true){
        //返回结构：[[{comment},...,{commnet}],...,[{comment},...,{commnet}]]
        //最外层元素为不同的帖子的评价；最内侧元素同意帖子的不同评价
        //如果flag为flase，则只返回ifread字段为1的评论
        const commentLists = [];
        for(const post of allPosts){
            const comments = await commentService.getCommentsofPost(post.id, flag);
            commentLists.push(comments)
        }
        return commentLists;
    }
}


module.exports = commentService;
