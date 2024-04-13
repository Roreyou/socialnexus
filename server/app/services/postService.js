// services/postService.js

const db = require('../models/index');
const { Op } = require('sequelize');

class postService{
    static async getPostDetails(postId){
        try {
            console.log(typeof postId)
            const post = await db.post.findByPk(postId);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error fetching post details');
        }
    }
}


module.exports = postService;
