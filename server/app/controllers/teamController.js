//controllers/teasmController.js
const ResultCode = require('../common/BaseResultCode');
const Result = require('../common/Result');
const teamService = require('../services/teamService');

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
}

module.exports = teamController;