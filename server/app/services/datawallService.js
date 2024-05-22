//services/datawallService.js
const db = require('../models/index');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

class DatawallService {
    static async getActivityTypeCounts() {
        const activityCounts = await db.activity.count({
          attributes: ['category_id'],
          group: ['category_id'],
          raw: true
        });
      
        // 对活动类型数量进行排序
        const sortedActivityCounts = activityCounts.sort((a, b) => b.count - a.count);
      
        // 获取前四种活动类型和其他活动类型的数量总和
        const topFour = sortedActivityCounts.slice(0, 4);
        const otherCount = sortedActivityCounts.slice(4).reduce((sum, activity) => sum + activity.count, 0);
      
        // 获取活动类型的名称
        const activityTypeNames = await Promise.all(topFour.map(async activity => {
          const activityType = await db.activity_type.findOne({
            where: { id: activity.category_id },
            attributes: ['type_name'],
            raw: true
          });
          return { name: activityType.type_name, value: activity.count };
        }));
      
        // 构建返回结果数组
        const result = activityTypeNames.map(type => ({ name: type.name, value: type.value }));
        if (otherCount > 0) {
          result.push({ name: '其他', value: otherCount });
        }
      
        return result;
    }
    static async getMajorTypeCounts() {
      const majorCounts = await db.teammember.findAll({
          attributes: ['major', [sequelize.fn('COUNT', 'major'), 'count']],
          where: {
              major: {
                  [Op.not]: null
              }
          },
          group: ['major'],
          raw: true
      });
  
      // 对专业数量进行排序
      const sortedMajorCounts = majorCounts.sort((a, b) => b.count - a.count);
  
      // 获取前四种专业和其他专业的数量总和
      const topFour = sortedMajorCounts.slice(0, 4);
      const otherCount = sortedMajorCounts.slice(4).reduce((sum, major) => sum + parseInt(major.count), 0);
  
      // 构建返回结果数组
      const result = topFour.map(major => ({ name: major.major, value: major.count }));
      if (otherCount > 0) {
          result.push({ name: '其他', value: otherCount });
      }
  
      return result;
  }

}

module.exports = DatawallService;