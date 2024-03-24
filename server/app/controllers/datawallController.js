//datawallController.js
const Result = require('../common/Result');
const { activity } = require('../models');
const DatawallService = require('../services/datawallService');

class DatawallController {
    static async getDatawallByActivity(req, res) {
        const activity_id = req.query.activity_id;
        try {
            const datawall = await DatawallService.getDatawallByActivity(activity_id);
            if(!datawall)
                return res.json(Result.fail('数据不存在'));
            return res.json(Result.success(datawall));
        } catch (error) {
            return res.json(Result.fail(error.message));
        }
    }

    static async getDatawallByCommunity(req, res) {
        const community_id = req.query.community_id;
        try {
            const datawall = await DatawallService.getDatawallByCommunity(community_id);
            if(!datawall)
                return res.json(Result.fail('数据不存在'));
            return res.json(Result.success(datawall));
        } catch (error) {
            return res.json(Result.fail(error.message));
        }


    }
}

module.exports = DatawallController;