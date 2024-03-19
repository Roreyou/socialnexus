const Result = require('../common/Result');
const activityService = require('../services/activityService');

class ActivityController {
  static async getAllActivities(req, res) {
    try {
      const activities = await activityService.getAllActivities();
      return res.json(Result.success(activities));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async createActivity(req, res) {
    try {
      const activity = await activityService.createActivity(req.body);
      return res.json(Result.success('活动添加成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async getActivityById(req, res) {
    console.log('req.query:',req.query);
    const { id } = req.query;
    try {
      const activity = await activityService.getActivityById(id);
      if (!activity) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success(activity));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async updateActivity(req, res) {
    const { id } = req.params;
    const newActivity = req.body;
    try {
      const activity = await activityService.updateActivity(id, newActivity);
      if (!activity) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success(activity));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async deleteActivity(req, res) {
    const { id } = req.params;
    try {
      const activity = await activityService.deleteActivity(id);
      if (!activity) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success('活动删除成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }
}

module.exports = ActivityController;