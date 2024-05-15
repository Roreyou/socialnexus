//datawallController.js
const Result = require('../common/Result');
const { activity } = require('../models');
const DatawallService = require('../services/datawallService');

class DatawallController {
    static async getActivityTypeCounts(req, res) {
        try {
            const datawall = await DatawallService.getActivityTypeCounts();
            if(!datawall)
                return res.json(Result.fail('数据不存在'));
            return res.json(Result.success(datawall));
        } catch (error) {
            return res.json(Result.fail(error.message));
        }
    }

    static async getMajorTypeCounts(req, res) {
        try {
            const datawall = await DatawallService.getMajorTypeCounts();
            if(!datawall)
                return res.json(Result.fail('数据不存在'));
            return res.json(Result.success(datawall));
        } catch (error) {
            return res.json(Result.fail(error.message));
        }


    }
}

module.exports = DatawallController;