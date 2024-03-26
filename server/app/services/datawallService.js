//services/datawallService.js
const db = require('../models/index');

class DatawallService {
    static async getDatawallByActivity(activity_id) {
        // 建立关联关系
        db.datawall_act.belongsTo(db.activity, { foreignKey: 'activity_id' });
        let queryOptions = {
            include: [{ model: db.activity, as: 'activity' }]
        };
        if (activity_id !== '0') {
            queryOptions.where = { activity_id: activity_id };
        }

        try {
            const data = await db.datawall_act.findAll(queryOptions);
            if(data.length === 0)
                return null;
            return data;
        } catch (error) {
            return error;
        }
    }
    static async getDatawallByCommunity(community_id) {
        // 建立关联关系
        db.datawall_com.belongsTo(db.community, { foreignKey: 'community_id' });
        let queryOptions = {
            include: [{ model: db.community, as: 'community' }]
        };
        if (community_id !== '0') {
            queryOptions.where = { community_id: community_id };
        }

        try {
            const data = await db.datawall_com.findAll(queryOptions);
            if(data.length === 0)
                return null;
            return data;
        } catch (error) {
            return error;
        }
    }
}

module.exports = DatawallService;