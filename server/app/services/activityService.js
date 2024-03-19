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

  static async queryActivity(name) {
    const activities = await db.activity.findAll({
        [Op.or]: [
            { name: { [Op.like]: '%' + name + '%' } },
        ]
      });
    if (!activities) {
      return null; // 返回null表示活动不存在
    }
    return activities;
  }
}

module.exports = ActivityService;