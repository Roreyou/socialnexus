const db = require('../models/index');
const { Op } = require('sequelize');

class ActivityService {
  static async getAllActivities() {
    return await db.activity.findAll();
  }

  static async createActivity(activityData) {
    return await db.activity.create(activityData);
  }

  static async getActivityById(id) {
    return await db.activity.findByPk(id);
  }

  static async getActivityByCommu(commu_id, status) {
    let whereCondition = {};
    if (commu_id !== '0') {
      whereCondition.community_id = commu_id;
    }
    if (status !== '0') {
      whereCondition.status = status;
    }
    const activities = await db.activity.findAll({
      where: whereCondition
    });

    if (activities.length === 0) {
        return null;
    }

    return activities;
}

  static async updateActivity(id, activityData) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示活动不存在
    }
    await activity.update(activityData);
    return activity;
  }

  static async deleteActivity(id) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示活动不存在
    }
    await activity.destroy();
    return activity;
  }

  static async queryActivity(community_id, name) {
    let whereClause = {};
  
    // 添加活动名称的模糊查询条件
    whereClause.name = { [Op.like]: `%${name}%` };
  
    // 如果 community_id 不为 0，则添加 community_id 的查询条件
    if (community_id !== '0') {
      whereClause.community_id = community_id;
    }
  
    // 执行查询
    const activities = await db.activity.findAll({
      where: whereClause
    });

    if (activities.length === 0) {
      return null
    }
  
    return activities;
  }

  //审核社区活动
  static async approveActivity(id,approve) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示队伍不存在
    }
    await activity.update(
      {
        status: approve
      },
      { returning: true }
    );
    return activity;
  }

  static async queryActivity2(text) {
    const whereCondition = {
      [Op.and]: [
          {
              name: {
                  [Op.like]: `%${text}%`
              }
          },
          db.Sequelize.literal(`name NOT LIKE '%${text} %'`),
          db.Sequelize.literal(`name NOT LIKE '% ${text}%'`)
      ]
    };
    const activities = await db.activity.findAll({
      where: whereCondition
    });
    if (!activities) {
      return null; // 返回null表示活动不存在
    }
    return activities;
  }

  static async filterActivities(location, categoryId, activityTime) {
    let whereCondition = {};

    // 添加地区筛选条件
    if (location&& location.province) {
      if(location.city){
        whereCondition.city = location.city;
      }
      whereCondition.province = location.province;
    }

    // 添加类型筛选条件
    if (categoryId !== 0) {
      whereCondition.category_id = categoryId;
    }

    // 添加时间筛选条件
    if (activityTime) {
      whereCondition.start_time = { [db.Sequelize.Op.lte]: activityTime };
      whereCondition.end_time = { [db.Sequelize.Op.gte]: activityTime };
    }

    // 查询符合条件的活动
    const activities = await db.activity.findAll({ where: whereCondition });

    return activities;
  }

  // 获取已报名活动列表的服务方法
  static async getMyActiv(team_id, activity_status) {
    try {
      // 在活动表中根据团队 ID 查找所有相关的活动 ID
      const activityIds = await db.teamactivity.findAll({
          where: {
            team_id: team_id
          }
      });

      // 将查询到的活动 ID 转换为数组
      const activityIdsArray = activityIds.map(activity => activity.activity_id);

      console.log("debug: ", activity_status);
      // 在团队活动表中根据活动 ID 和活动开展状态返回对应记录
      const myActivList = await db.activity.findAll({
          where: {
              id: activityIdsArray,
              activity_status: activity_status
          }
      });
      return myActivList;
    } catch (error) {
        throw error;
    }
  }

  // 搜索已报名活动列表的服务方法
  static async searchMyActiv(team_id, activity_name) {
    try {
      // 在这里编写搜索已报名活动列表的逻辑
      // 在活动表中根据团队 ID 查找所有相关的活动 ID
      const activityIds = await db.teamactivity.findAll({
          where: {
            team_id: team_id
          }
      });

      // 将查询到的活动 ID 转换为数组
      const activityIdsArray = activityIds.map(activity => activity.activity_id);

      // 假设根据搜索文本查询数据库中的活动信息
      const whereCondition = {
        [Op.and]: [
            {
                name: {
                    [Op.like]: `%${activity_name}%`
                }
            },
            db.Sequelize.literal(`name NOT LIKE '%${activity_name} %'`),
            db.Sequelize.literal(`name NOT LIKE '% ${activity_name}%'`),
            {
              id: activityIdsArray
            }
        ]
      };
      const activList = await db.activity.findAll({
        where: whereCondition
      });
      if (!activList) {
        return null; // 返回null表示活动不存在
      }
      return activList;
    } catch (error) {
        throw error;
    }
  }

  // 取消报名活动的服务方法
  static async cancelRegisterEvent(team_id, activ_id) {
    try {
        // 在这里编写取消报名活动的逻辑
        // 假设删除指定队伍和活动的关联记录
        await db.teamactivity.destroy({
            where: {
                activity_id: activ_id,
                team_id: team_id                
            }
        });
    } catch (error) {
        throw error;
    }
  }

}

module.exports = ActivityService;