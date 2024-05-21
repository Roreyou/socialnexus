//services/communityService.js
const db = require('../models/index');
const bcrypt = require('bcrypt');
const ImageService = require('./imageService');

class CommunityService{
    static async getCommunityById(id) {
        let community= await db.community.findByPk(id);
        if(community){
            return community;
        }else{
            return null;
        }
    }

    static async updateCommunity(id, communityData) {
        const community = await db.community.findByPk(id);
        //修改密码也在这里
        communityData.pwd = await bcrypt.hash(communityData.pwd, 10);
        if (!community) {
          return null; // 返回null表示社区不存在
        }
        await community.update(communityData);
        return community;
    }

    static async getCommunityNameById(id){
        const community = await db.community.findOne({
            where: {
                id: id
            },
            attributes:['name'] 
          });
          return community.name;
    }

}

module.exports = CommunityService;