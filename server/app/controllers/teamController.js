//controllers/teasmController.js
const Result = require('../common/Result');
const teamService = require('../services/teamService');
const activityService = require('../services/activityService');

class teamController {
  static async modifyPwd(req, res){
    try {
        const { identity, old_pwd, new_pwd, user_id } = req.body;
        // 调用服务层方法修改密码
        const result = await teamService.modifyPwd(identity, old_pwd, new_pwd, user_id);

        // 返回结果
        return res.json(Result.success("modify successfully!"));
    } catch (error) {
        // 返回错误信息
        return res.json(Result.fail("modify unsuccessfully!"));
    }
  }

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

  static async getTeamByStatus(req, res) {
    // console.log('req.query:',req.query);
    const { status } = req.query;
    try {
      const team = await teamService.getTeamByStatus(status);
      if (!team) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success({"list":team}));
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

  static async queryTeamActByName(req,res){
    const commu_id=req.query.community_id;
    const team_name =req.query.team_name;
    try {
      const teams = await teamService.queryTeamActByName(commu_id,team_name);
      if (!teams) {
        return res.json(Result.fail('队伍不存在'));
      }
      return res.json(Result.success(teams));
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
        return res.json(Result.fail({status:'队伍不存在'}));
      }
      return res.json(Result.success({status:'审核成功'}));
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
      return res.json(Result.success({status: 3}));
    } catch (error) {
      console.error(error);
      return res.json(Result.fail(error));
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
          return res.json(Result.success('Activity favorited successfully!'));
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
          return res.json(Result.success('Activity favorited Unsuccessfully!'));
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
      const { city, province, page } = req.query;
  
      // 调用服务方法获取活动推荐列表
      const recommendations = await teamService.getRecommend(city, province, page);

      // 返回成功响应
      return res.json(Result.success({acti_list: recommendations}));
    } catch (error) {
        // 返回错误响应
        console.error('Error getting recommendations:', error);
        return res.json(Result.fail('Failed to get recommendations！'));        
    }
  }

  // 获取已报名活动的控制器方法
  static async getMyActiv(req, res) {
    try {
        const { team_id, activity_status, page } = req.query;
        
        // 查看队伍是否存在
        const flag = await teamService.FindTeam(team_id);
        console.log("flag:",flag);
        if(flag){
          // 调用服务方法获取已报名活动列表
          const myActivList = await activityService.getMyActiv(team_id, activity_status, page);
          // 返回成功响应
          return res.json(Result.success(myActivList));
        }
        else{
          return res.json(Result.fail("Can not find the team!"));
        }

    } catch (error) {
        // 返回错误响应
        return res.json(Result.fail(error));
    }
}

  // 搜索已报名活动的控制器方法
  static async searchMyActiv(req, res) {
      try {
          const { team_id, activity_name } = req.query;
           // 查看队伍是否存在
          const flag = await teamService.FindTeam(team_id);
          if(flag){
            // 调用服务方法搜索已报名活动列表
            const activList = await activityService.searchMyActiv(team_id, activity_name);

            // 返回成功响应
            return res.json(Result.success(activList));
          }else{
            return res.json(Result.fail("Can not find the team!"));
          }

      } catch (error) {
          // 返回错误响应
          console.error('Error searching my activities:', error);
          res.json(Result.fail("Error searching my activities"));
      }
  }

  // 取消报名活动的控制器方法
  static async cancelRegisterEvent(req, res) {
      try {
        const { team_id, activ_id } = req.query;

        const existingEvent = await teamService.findEvent(activ_id, team_id);
        
        if(!existingEvent || team_id == null || activ_id ==null ){
          return res.json(Result.fail("Can not cancel non-existed registration!"));
        }

        // 调用服务方法取消报名活动
        await activityService.cancelRegisterEvent(team_id, activ_id);

        // 返回成功响应
        return res.json(Result.success("Successfully canceled registration!"));
      } catch (error) {
          // 返回错误响应
          console.error('Error canceling registration:', error);
          return res.json(Result.fail("Failed to cancel registration!"));
      }
  }

  // 获取高校队伍对活动的评价
  static async getMyComments(req, res) { 
    try {
      const { team_id, activity_id } = req.query;
      const results = await teamService.getMyComments(team_id, activity_id);
      return res.json(Result.success({ com_list: results }));
    } catch (error) {
      console.error('Failed to get my comments:', error);
      return res.json(Result.fail("Failed to get my comments!"));
    }
  }

  // 发表对未评价活动的评价
  static async commentActivity(req, res) {
    try {
      const { team_id, activity_id, comment } = req.body;

      const result = await teamService.commentActivity(team_id, activity_id, comment);
      return res.json(Result.success(result));
    } catch (error) {
      console.error('Failed to comment activity:', error);
      return res.json(Result.fail("Failed to comment activity!"));
    }
  }

  //获取基层人员对队伍的评价
  static async getCommunityComments(req, res) {
    try {
      const { team_id} = req.query;
      const communityComments = await teamService.getCommunityComments(team_id);
      return res.json(Result.success({ com_list: communityComments }));
    } catch (error) {
      console.error('Failed to get community comments:', error);
      return res.json(Result.fail("Failed to get community comments!"));
    }
  }

  //获取本队伍的信息
  static async getTeamInfo(req, res) {
    try {
      const { team_id } = req.query;
      const teamInfo = await teamService.getTeamInfo(team_id);
      return res.json(Result.success(teamInfo));
    } catch (error) {
      console.error('Failed to get team info:', error);
      return res.json(Result.fail("Failed to get team info!"));
   }
  }

  // 获取收藏的活动
  static async getTeamFavorites(req, res) {
    try {
      const { team_id } = req.query;
      const teamFavorites = await teamService.getTeamFavorites(team_id);
      return res.json(Result.success({ acti_list: teamFavorites }));
    } catch (error) {
      console.error('Failed to get team favorites:', error);
      return res.json(Result.fail("Failed to get team favorites!"));
    }
  }

  // 获取已评价列表
  static async getMyCommentsFinished(req,res){
    try {
      const { team_id } = req.query;
      const results = await teamService.getMyCommentsFinished(team_id);
      return res.json(Result.success({ com_list: results }));
    } catch (error) {
      console.error('Failed to get my comments:', error);
      return res.json(Result.fail("Failed to get my comments!"));
    }
  }

  static async getMyCommentsUnfinished(req,res){
    try {
      const { team_id } = req.query;
      const results = await teamService.getMyCommentsUnfinished(team_id);
      return res.json(Result.success({ com_list: results }));
    } catch (error) {
      console.error('Failed to get my comments:', error);
      return res.json(Result.fail("Failed to get my comments!"));
    }
  }

  //验证队伍是否报名
  static async getIsRegister(req, res){
    try {
      const { team_id, acti_id } = req.query;
      const results = await teamService.getIsRegister(team_id, acti_id);
      return res.json(Result.success( results ));
    } catch (error) {
      return res.json(Result.fail(error));
    }
  }

  static async modifyInfo(req, res){
    try {
      const { team_id, instrData, leaderData, membersData } = req.body;

      // 调用服务层方法更新队伍信息
      const result = await teamService.modifyInfo(team_id, instrData, leaderData, membersData);

      // 返回成功信息
      return res.json(Result.success(result));
    } catch (error) {
        // 返回错误信息
        return res.json(Result.fail(error));
    }
  }

}

module.exports = teamController;