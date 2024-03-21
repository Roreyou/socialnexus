//services/teamService.js
const db = require('../models/index');
const { Op } = require('sequelize');

class teamService {
  static async getAllTeams() {
    return await db.team.findAll();
  }

  static async createTeam(teamData) {
    return await db.team.create(teamData);
  }

  static async getTeamById(id) {
    return await db.team.findByPk(id);
  }

  //依据社区和状态
  static async getTeamByCommu(commu_id, status) {
    let whereCondition_commu = {};
    let whereCondition_status = {};
    if (commu_id !== '0') {
      whereCondition_commu.community_id = commu_id;
    }
    if (status !== '0') {
      whereCondition_status.status = status;
    }
  
    const activities = await db.activity.findAll({
      where: whereCondition_commu,
      attributes: ['id']
    });
    
    const activityIds = activities.map(activity => activity.id);
  
    if (activityIds.length === 0) {
      return null;
    }
  
    whereCondition_status.activity_id = {
      [Op.in]: activityIds
    }

    const teamActivities = await db.teamactivity.findAll({
      where: whereCondition_status,
      attributes: ['team_id']
    });
  
    const teamIds = teamActivities.map(teamActivity => teamActivity.team_id);
  
    if (teamIds.length === 0) {
      return null;
    }
  
    const teams = await db.team.findAll({
      where: {
        id: {
          [db.Sequelize.Op.in]: teamIds
        }
      }
    });
  
    return teams;
  }

  static async updateTeam(id, teamData) {
    const team = await db.team.findByPk(id);
    if (!team) {
      return null; // 返回null表示队伍不存在
    }
    await team.update(teamData);
    return team;
  }

  static async deleteTeam(id) {
    const team = await db.team.findByPk(id);
    if (!team) {
      return null; // 返回null表示队伍不存在
    }
    await team.destroy();
    return team;
  }

  static async queryTeamByName(commu_id,team_name) {
    const teams_by_commu = await this.getTeamByCommu(commu_id,'0')
    if(!teams_by_commu)
      return null;
    //继续模糊查询by_teamName
    const fuzzyTeamName = team_name; 
    const teamsFiltered = teams_by_commu.filter(team => team.team_name.includes(fuzzyTeamName));

    if(teamsFiltered.length === 0)
      return null;
    return teamsFiltered;
  }


  static async queryTeamByAct(commu_id,act_name) {
    let whereCondition_commu = {};
    let whereCondition_act = {};
    if (commu_id !== '0') {
      whereCondition_commu.community_id = commu_id;
    }
    //用活动名模糊查询
    whereCondition_commu.name = {
      [Op.like]: '%' + act_name + '%'
    };

    const activities = await db.activity.findAll({
      where: whereCondition_commu,
      attributes: ['id']
    });
    
    const activityIds = activities.map(activity => activity.id);
  
    if (activityIds.length === 0) {
      return null;
    }
  
    whereCondition_act.activity_id = {
      [Op.in]: activityIds
    }

    const teamActivities = await db.teamactivity.findAll({
      where: whereCondition_act,
      attributes: ['team_id']
    });
  
    const teamIds = teamActivities.map(teamActivity => teamActivity.team_id);
  
    if (teamIds.length === 0) {
      return null;
    }
  
    const teams = await db.team.findAll({
      where: {
        id: {
          [db.Sequelize.Op.in]: teamIds
        }
      }
    });
  
    return teams;

  }

}

module.exports = teamService;