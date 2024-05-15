const Result = require('../common/Result');
const activityService = require('../services/activityService');
const teamService = require('../services/teamService');

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
    const id = req.body.id;
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
    const community_id = req.query.community_id;
    const name =req.query.name;
    try {
      const activities = await activityService.queryActivity(community_id,name);
      if (!activities) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success(activities));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }
  //审核活动
  static async approveActivity(req,res){
    const activity_id=req.body.id;
    const approve = req.body.approve;
    try {
      const activity = await activityService.approveActivity(activity_id,approve);
      if (!activity) {
        return res.json(Result.fail('活动不存在'));
      }
      return res.json(Result.success({status:'审核成功'}));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  // 全部活动条件筛选
  static async filterActivity(req,res){
    
    try {
      const { location, category_id, activity_time } = req.body;

      // 调用服务层方法进行活动筛选
      const activities = await activityService.filterActivities(location, category_id, activity_time);

      // 构造返回数据
      const responseData = {
        code: 200,
        msg: 'Success',
        data: { activ_list: activities }
      };

      // 发送响应
      res.json(responseData);
    } catch (error) {
      console.error(error);
      const responseData = { code: 500, msg: 'Internal Server Error', data: null };
      res.status(500).json(responseData);
    }
  }

  // 模糊查询活动信息
  static async searchActivities(req, res) {
    try {
      const { text, page } = req.query;
  
      // 调用服务层方法进行活动模糊查询
      const activities = await activityService.queryActivity2(text, page);
  
  
      // 返回成功响应
      res.json(Result.success(activities));
    } catch (error) {
      console.error(error);
      res.status(500).json(Result.fail('Internal Server Error'));
    }
  }

  // 获取某一活动详情
  static async getactiDetail(req, res){
    // console.log('req.query:',req.query);
    const { acti_id:id } = req.query;
    console.log(id);
    try {
      const flag = await activityService.FindActivity(id);
      if(flag){
        const activity = await activityService.getactidetail(id);
        return res.json(Result.success(activity));
      }
      else{
        return res.json(Result.fail('Can not find activity!'));
      }
      
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  // 获取报名页面详情
  static async getRegisterDetail(req, res){
    try {
      const {team_id, acti_id} = req.query;
      const results = await activityService.getRegisterDetail(team_id, acti_id);
      return res.json(Result.success(results));
    } catch (error) {
      return res.json(Result.fail(error));
    }
  }

  // 获取海报信息
  static async getPosterInfo(req, res){
    try {
      const {acti_id} = req.query;
      const results = await activityService.getPosterInfo(acti_id);
      return res.json(Result.success(results));
    } catch (error) {
      return res.json(Result.fail(error));
    }
  }
}

module.exports = ActivityController;