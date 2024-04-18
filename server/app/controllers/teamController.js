//controllers/teasmController.js
const ResultCode = require('../common/BaseResultCode');
const Result = require('../common/Result');
const teamService = require('../services/teamService');
const activityService = require('../services/activityService');

class teamController {
  static async getAllTeams(req, res) {
    try {
      const teams = await teamService.getAllTeams();
      return res.json(Result.success(teams));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }


  static async getTeamById(req, res) {
    // console.log('req.query:',req.query);
    const { id } = req.query;
    try {
      const team = await teamService.getTeamById(id);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success(team));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async getTeamByCommu(req, res) {
    const commu_id = req.query.community_id;
    const status=req.query.status;
    try {
      const team = await teamService.getTeamByCommu(commu_id,status);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success(team));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async updateTeam(req, res) {
    const id = req.body.id;
    const newteam = req.body;
    try {
      const team = await teamService.updateteam(id, newteam);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success('队伍修改成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async deleteTeam(req, res) {
    const id  = req.query.id;
    try {
      const team = await teamService.deleteTeam(id);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success('队伍删除成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async queryTeamByName(req,res){
    const commu_id=req.query.community_id;
    const team_name =req.query.team_name;
    try {
      const teams = await teamService.queryTeamByName(commu_id,team_name);
      if (!teams) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success(teams));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async queryTeamByAct(req,res){
    const commu_id=req.query.community_id;
    const act_name =req.query.act_name;
    try {
      const teams = await teamService.queryTeamByAct(commu_id,act_name);
      if (!teams) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success(teams));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async admitTeam(req,res){
    const team_id=req.body.team_id;
    const activity_id =req.body.activity_id;
    const admit = req.body.admit;
    try {
      const team = await teamService.admitTeam(team_id,activity_id,admit);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success('录取成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async commentTeam(req,res){
    const team_id=req.body.team_id;
    const activity_id =req.body.activity_id;
    const comment = req.body.comment;
    try {
      const team = await teamService.commentTeam(team_id,activity_id,comment);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success('评价成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
    
  }

  static async approveTeam(req,res){
    const team_id=req.body.id;
    const approve = req.body.approve;
    try {
      const team = await teamService.approveTeam(team_id,approve);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success('审核成功'));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }

  static async authentification(req,res){
    try {
      const { id, status, instructor, members } = req.body;
  
      // 保存指导老师和队伍成员的信息到数据库
      const { instructor: savedInstructor, members: savedMembers } = await teamService.saveInstructorAndMembers(instructor, members);
  
      // 返回响应告诉前端该信息正在被团委审核
      const response = new Result(ResultCode.SUCCESS.code, 'The information is being reviewed by the committee.', {
        status: 3});
      return res.json(response);
    } catch (error) {
      console.error(error);
      const response = new Result(ResultCode.FAILED.code, 'Internal Server Error', {status:0});
      return  re.json(response);
    }
  }

  static async favoriteActivity(req, res) {
    try {
        // 获取前端传来的队伍ID和活动ID
        const { team_id, activity_id, favor } = req.query;
        console.log("favor:",favor)
        if(favor==0){
          //收藏功能

          // 检查记录是否存在
          const existingFavorite = await teamService.getFavorite(team_id, activity_id);
          if (existingFavorite) {
              return res.status(400).json({ code: 400, msg: 'Activity already favorited' });
          }
          // 创建新记录
          await teamService.createFavorite(team_id, activity_id);
          // 返回成功响应
          return res.json({code:ResultCode.SUCCESS.code, msg: 'Activity favorited successfully' });
          }
        else if (favor==1){
          // 取消收藏功能

          // 检查记录是否存在
          const existingFavorite = await teamService.getFavorite(team_id, activity_id);
          if (!existingFavorite) {
              return res.status(400).json({ code: 400, msg: 'Activity not favorited yet' });
          }
          // 删除收藏记录
          await teamService.deleteFavorite(team_id, activity_id);
          // 返回成功响应
          return res.json({ code: ResultCode.SUCCESS.code, msg: 'Activity unfavorited successfully' });
        }
    } catch (error) {
        console.error('Error favoriting activity:', error);
        return res.status(500).json({ code: 500, msg: 'Internal server error' });
    }
  }

  static async registerEvent(req, res){
      try {
        const { team_id, activity_id } = req.body;
        
        const existingEvent = await teamService.findEvent(activity_id, team_id);
        if (existingEvent) {
          // 如果记录已存在，则返回对应响应的提示
          return res.json({code: '500', msg: 'Event already registered',data: null});
        }

        // 调用服务方法进行报名活动操作
        const result = await teamService.registerEvent(activity_id, team_id);
        // 返回成功响应
        return res.json({code: '200', msg: 'Activity registered successfully',data: result});
      } catch (error) {
          // 返回错误响应
          console.log("debug 01:",error)
          res.status(500).json({code: '500', msg: 'Failed to register activity',data: null});
      }
  }  

  static async getRecommend(req, res){
    try {
      const { city, province } = req.query;
  
      // 调用服务方法获取活动推荐列表
      const recommendations = await teamService.getRecommend(city, province);

      // 返回成功响应
      res.json({code: 200, msg: 'Success', data: {acti_list: recommendations}});
    } catch (error) {
        // 返回错误响应
        console.error('Error getting recommendations:', error);
        res.status(500).json({code: 500, msg: 'Failed to get recommendations', data: null});
    }
  }

  // 获取已报名活动的控制器方法
  static async getMyActiv(req, res) {
    try {
        const { team_id, activity_status } = req.query;
        
        // 调用服务方法获取已报名活动列表
        const myActivList = await activityService.getMyActiv(team_id, activity_status);

        // 返回成功响应
        res.json({code: 200, msg: 'Success', data: {myactiv_list: myActivList}});
    } catch (error) {
        // 返回错误响应
        console.error('Error getting my activities:', error);
        res.status(500).json({code: 500, msg: 'Failed to get my activities', data: null });
    }
}

  // 搜索已报名活动的控制器方法
  static async searchMyActiv(req, res) {
      try {
          const { team_id, activity_name } = req.query;
          
          // 调用服务方法搜索已报名活动列表
          const activList = await activityService.searchMyActiv(team_id, activity_name);

          // 返回成功响应
          res.json({code: 200, msg: 'Success', data: {myactiv_list: activList}});
      } catch (error) {
          // 返回错误响应
          console.error('Error searching my activities:', error);
          res.status(500).json({code: 500, msg: 'Failed to search my activities', data: null });
      }
  }

  // 取消报名活动的控制器方法
  static async cancelRegisterEvent(req, res) {
      try {
        const { team_id, activ_id } = req.query;

        const existingEvent = await teamService.findEvent(activ_id, team_id);
        
        if(!existingEvent || team_id == null || activ_id ==null ){
          res.status(500).json({code: 500, msg: 'Can not cancel non-existed registration', data: null });
        }

        // 调用服务方法取消报名活动
        await activityService.cancelRegisterEvent(team_id, activ_id);

        // 返回成功响应
        res.json({code: 200 ,msg: 'Successfully canceled registration'});
      } catch (error) {
          // 返回错误响应
          console.error('Error canceling registration:', error);
          res.status(500).json({code: 500, msg: 'Failed to cancel registration', data: null });
      }
  }

  // 获取高校队伍对活动的评价
  static async getMyComments(req, res) { 
    try {
      const { team_id, activity_id } = req.query;
      const results = await teamService.getMyComments(team_id, activity_id);
      return res.status(200).json({ code: 200, msg: 'Success', data: { com_llist: results } });
    } catch (error) {
      console.error('Failed to get my comments:', error);
      return res.status(500).json({ code: 500, msg: 'Failed to get my comments', data: null });
    }
  }

  // 发表对未评价活动的评价
  static async commentActivity(req, res) {
    try {
      const { team_id, activity_id, comment } = req.body;

      const result = await teamService.commentActivity(team_id, activity_id, comment);
      return res.json(result);
    } catch (error) {
      console.error('Failed to comment activity:', error);
      return res.status(500).json({ code: 500, msg: 'Failed to comment activity' });
    }
  }

  //获取基层人员对队伍的评价
  static async getCommunityComments(req, res) {
    try {
      const { team_id} = req.query;
      const communityComments = await teamService.getCommunityComments(team_id);
      return res.status(200).json({ code: 200, msg: 'Success', data: { com_list: communityComments } });
    } catch (error) {
      console.error('Failed to get community comments:', error);
      return res.status(500).json({ code: 500, msg: 'Failed to get community comments', data: null });
    }
  }

  //获取本队伍的信息
  static async getTeamInfo(req, res) {
    try {
      const { team_id } = req.query;
      const teamInfo = await teamService.getTeamInfo(team_id);
      return res.status(200).json({ code: 200, msg: 'Success', data: { info: teamInfo } });
    } catch (error) {
      console.error('Failed to get team info:', error);
      return res.status(500).json({ code: 500, msg: 'Failed to get team info', data: null });
    }
  }

  // 获取收藏的活动
  static async getTeamFavorites(req, res) {
    try {
      const { team_id } = req.query;
      const teamFavorites = await teamService.getTeamFavorites(team_id);
      return res.status(200).json({ code: 200, msg: 'Success', data: { acti_list: teamFavorites } });
    } catch (error) {
      console.error('Failed to get team favorites:', error);
      return res.status(500).json({ code: 500, msg: 'Failed to get team favorites', data: null });
    }
  }
}

module.exports = teamController;