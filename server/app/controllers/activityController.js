const Result = require('../common/Result');
const activityService = require('../services/activityService');

class ActivityController {
  static async getAllActivities(req, res) {
    try {
      const activities = await activityService.getActivities();
      return res.json(Result.success(activities));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async createActivity(req, res) {
    try {
      await activityService.createActivity(req.body);
      return res.json(Result.success('活动添加成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async getActivityById(req, res) {
    // console.log('req.query:',req.query);
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

  static async getActivityByCommu(req, res) {
    const commu_id = req.query.community_id;
    const status=req.query.status;
    try {
      const activity = await activityService.getActivityByCommu(commu_id,status);
      if (!activity) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success(activity));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async updateActivity(req, res) {
    const id = req.query.id;
    const newActivity = req.body;
    try {
      const activity = await activityService.updateActivity(id, newActivity);
      if (!activity) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success('活动修改成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async deleteActivity(req, res) {
    const id  = req.query.id;
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

  static async queryActivity(req,res){
    const name =req.query.name;
    try {
      const activities = await activityService.queryActivity(name);
      if (!activities) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success(activities));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }
}

module.exports = ActivityController;