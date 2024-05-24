//controllers/postController.js

const postService = require('../services/postService');
const commentService = require('../services/commentService');
const Result = require('../common/Result');
const ImageService = require('../services/imageService');


class postController{
    static async createPost(req, res){
        try {
            // 获取客户端提交的帖子数据
            const postData = req.body;
            // 调用服务层函数来创建帖子
            const postId = await postService.createPost(postData);
    
            // 返回成功响应
            return res.json(Result.success(postId));
        } catch (error) {
            // 处理异常情况
            console.error('Error:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async getPostDetails(req, res){
        try {
            const {post_id, team_id} = req.query;

            // 调用服务层方法获取帖子详情和评论列表
            const post = await postService.getPostDetails(post_id);
            const comments = await commentService.getDetailedCommentsForPost(post_id,team_id);
            
            // 构造响应对象
            const result =  {
                post_detail: post,
                comment_list:comments.comment_list
            };
            // 返回响应给客户端
            return res.json(Result.success(result));
        } catch (error) {
            console.error('Error fetching post details:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async getHit(req, res){
        try {
            const {page} = req.query;
            // 调用服务层方法获取热门帖子
            const posts = await postService.getHotPosts(page);
            // 返回帖子列表
            return res.json(Result.success(posts));
        } catch (error) {
            console.error('Error fetching hot posts:', error);
            return res.json(Result.fail(error.message));
        }
    }

    static async getSameAreaPosts(req, res){
        const {province, city, page} = req.query;
        try {
            // 调用服务层方法获取同区域帖子
            const posts = await postService.getSameAreaPosts(province, city, page);
            
            // 返回帖子列表
            return res.json(Result.success(posts));
        } catch (error) {
            console.error('Error fetching same area posts:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async getLatestPosts(req, res){
        try {
            const {page} = req.query;
            // 调用服务层方法获取最新帖子
            const posts = await postService.getLatestPosts(page);
            
            // 返回帖子列表
            return res.json(Result.success({post_list:posts}));
        } catch (error) {
            console.error('Error fetching latest posts:', error);
            return res.json(Result.fail(error.message));
        }
    }
    static async commentOnPost(req, res){
        try {
            const { post_id, text, team_id } = req.body;
    
            // 调用评论服务层方法
            const { comment_list } = await commentService.commentOnPost(post_id, team_id, text);
    
            return res.json(Result.success({comment_list:comment_list}));
        } catch (error) {
            console.error('Error commenting on post:', error);
            return res.json(Result.fail(error.message));
        }
    }

    //点赞/取消点赞帖子
    static async likePost(req, res){
        const { post_id:post_id, team_id:team_id } = req.body;
        try {
            const updatedPost = await postService.likePost(post_id, team_id);
            return res.json(Result.success(updatedPost));
        } catch (error) {
            console.error('Error liking post:', error);
            return res.json(Result.fail(error.message));
        }
    }

    //点赞/取消点赞评论
    static async likeCom(req, res){
        const { comment_id:comment_id, team_id:team_id } = req.body;
        try {
            const updatedCom = await postService.likeCom(comment_id, team_id);
            return res.json(Result.success(updatedCom));
        } catch (error) {
            console.error('Error liking post:', error);
            return res.json(Result.fail(error.message));
        }
    }

    //点赞/取消点赞回复
    static async likeReply(req, res){
        const { reply_id, team_id } = req.body;
        try {
            const result = await postService.likeReply(reply_id, team_id);
            return res.json(Result.success(result));
        } catch (error) {
            console.error('Error liking reply:', error);
            return res.json(Result.fail(error.message));
        }
    }

    // 获取通知
    static async getnotice(req, res){
        try {
            const { my_id: team_id } = req.query;
            const notifications = await postService.getnotice(team_id);
            return res.json(Result.success(notifications));
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return res.json(Result.fail(error.message));
        }
    }

    //回复
    static async Reply(req, res){
        const { comment_id, reply_content, team_id } = req.body;
        try {
            const reply = await postService.createReply(comment_id, reply_content, team_id);
            return res.json(Result.success({reply_list:reply}));
        } catch (error) {
            console.error('Error:', error);
            return res.json(Result.fail(error.message));
        }
    }

    //删除帖子的评论
    static async delcomment(req, res){
        const { comment_id } = req.body;

        try {
            const deletedComment = await postService.deleteComment(comment_id);
            if (deletedComment === 0) {
                return res.json(new Result(404, "comment not found!"));
            } else {
                return res.json(Result.success("delete successfully!"));
            }           
        } catch (error) {
            console.error('Error:', error);
            return res.json(Result.fail(error.message));
        }
    }

    static async savePostImg(req, res){
        try {
            // 在这里获取上传的图片
            const image = req.file;
            console.log(image);
            const imageUrl = await ImageService.saveImg(image);
    
            return res.json(Result.success(imageUrl));
        } catch (error) {
            console.error('Error:', error);
            return res.json(Result.fail(error.message));
        }
    }

    static async getNoticeNum(req, res){
        try {
            const { team_id } = req.query;
            const noticeNum = await postService.getNoticeNum(team_id);
            return res.json(Result.success(noticeNum));
        } catch (error) {
            console.error('Error fetching notice number:', error);
            return res.json(Result.fail(error.message));
        }
    }

    static async delNotice(req, res){
        try {
            const { post_id,team_id } = req.body;
            const noticeNum = await postService.delNotice(team_id, post_id);
            return res.json(Result.success("delete successfully!"));
        } catch (error) {
            console.error('Error deleting notice:', error);
            return res.json(Result.fail(error.message));
        }
    }
}

module.exports = postController;