//controller/communityController.js
const Result = require('../common/Result');
const communityService = require('../services/communityService');

class CommunityController {
    static async getCommunityById(req, res) {
        // console.log('req.query:',req.query);
        const { id } = req.query;
        try {
          const community = await communityService.getCommunityById(id);
          if (!community) {
            return res.json(Result.fail('社区不存在'));
          }
          return res.json(Result.success(community));
        } catch (error) {
          return res.json(Result.fail(error.message));
        }
    }
    
    static async updateCommunity(req, res) {
        const id = req.body.id;
        const newCommunity = req.body;
        // console.log('newCommunity:',newCommunity);
        try {
          const community = await communityService.updateCommunity(id, newCommunity);
          if (!community) {
            return res.json(Result.fail('社区不存在'));
          }
          return res.json(Result.success('社区修改成功'));
        } catch (error) {
          return res.json(Result.fail(error.message));
        }
    }

}

module.exports = CommunityController;