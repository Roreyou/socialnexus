//services/communityService.js
const db = require('../models/index');
const bcrypt = require('bcrypt');

class CommunityService{
    static async getCommunityById(id) {
        return await db.community.findByPk(id);
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
        // 目前只有这一个我写了只返回属性，其它都是返回的字典
        const community = await db.community.findOne({
            where: {
                id: id
            },
            attributes:['name'] 
          });
          console.log(community);
          return community.name;
    }

}

module.exports = CommunityService;