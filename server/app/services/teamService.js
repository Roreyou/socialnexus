//services/teamService.js
const db = require('../models/index');
const { Op } = require('sequelize');

class schoolteamService {
  static async getAllActivities() {
    return await db.schoolteam.findAll();
  }

  static async createschoolteam(schoolteamData) {
    return await db.schoolteam.create(schoolteamData);
  }

  static async getschoolteamById(id) {
    return await db.schoolteam.findByPk(id);
  }

  static async getschoolteamByCommu(commu_id, status) {
    let whereCondition = {};
    if (commu_id !== '0') {
      whereCondition.community_id = commu_id;
    }
    if (status !== '0') {
      whereCondition.status = status;
    }
    const activities = await db.schoolteam.findAll({
      where: whereCondition
    });

    if (activities.length === 0) {
        return null;
    }

    return activities;
}

  static async updateschoolteam(id, schoolteamData) {
    const schoolteam = await db.schoolteam.findByPk(id);
    if (!schoolteam) {
      return null; // 返回null表示活动不存在
    }
    await schoolteam.update(schoolteamData);
    return schoolteam;
  }

  static async deleteschoolteam(id) {
    const schoolteam = await db.schoolteam.findByPk(id);
    if (!schoolteam) {
      return null; // 返回null表示活动不存在
    }
    await schoolteam.destroy();
    return schoolteam;
  }

  static async queryschoolteam(name) {
    const activities = await db.schoolteam.findAll({
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

module.exports = schoolteamService;