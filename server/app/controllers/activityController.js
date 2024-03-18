const Result = require('../common/Result');
const db = require('../models/index');

class ActivityController {
  static async getAllActivities(req, res) {
    try {
      const activities = await db.activity.findAll();
      return res.json(Result.success(activities));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async createActivity(req, res) {
    const { name, email } = req.body;
    try {
      const user = await db.User.create({ name, email });
      return res.json(Result.success(user));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async getActivityById(req, res) {
    const { id } = req.params;
    try {
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.json(Result.fail('用户不存在'));
      }
      return res.json(Result.success(user));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async updateActivity(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.json(Result.fail('用户不存在'));
      }
      await user.update({ name, email });
      return res.json(Result.success(user));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async deleteActivity(req, res) {
    const { id } = req.params;
    try {
      const user = await db.User.findByPk(id);
      if (!user) {
        return res.json(Result.fail('活动不存在'));
      }
      await user.destroy();
      return res.json(Result.success('互动删除成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }
}

module.exports = ActivityController;