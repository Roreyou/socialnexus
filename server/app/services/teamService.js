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

    console.log(whereCondition_status)

    const teamActivities = await db.teamactivity.findAll({
      where: whereCondition_status,
      attributes: ['team_id']
    });

    const teamIds = teamActivities.map(teamActivity => teamActivity.team_id);

    // console.log(teamIds)

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

  static async queryTeamByName(commu_id, team_name) {
    const teams_by_commu = await this.getTeamByCommu(commu_id, '0')
    if (!teams_by_commu)
      return null;
    //继续模糊查询by_teamName
    const fuzzyTeamName = team_name;
    const teamsFiltered = teams_by_commu.filter(team => team.team_name.includes(fuzzyTeamName));

    if (teamsFiltered.length === 0)
      return null;
    return teamsFiltered;
  }


  static async queryTeamByAct(commu_id, act_name) {
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

  //录取或驳回一个队伍
  static async admitTeam(team_id, activity_id, admit) {
    console.log(team_id, activity_id, admit);

    // 先查询符合条件的行
    const teamActivity = await db.teamactivity.findOne({
      where: {
        activity_id: activity_id,
        team_id: team_id
      }
    });

    // 如果未找到符合条件的记录，返回null
    if (!teamActivity) {
      return null;
    }

    // 更新找到的记录
    const updatedActivity = await teamActivity.update(
      { status: admit },
      { returning: true }
    );

    return updatedActivity;
  }

  //评价一个队伍
  static async commentTeam(team_id, activity_id, comment) {
    // 先查询符合条件的记录
    const teamActivity = await db.teamactivity.findOne({
      where: {
        activity_id: activity_id,
        team_id: team_id
      }
    });

    // 如果未找到符合条件的记录，返回null
    if (!teamActivity) {
      return null;
    }

    // 更新找到的记录
    const updatedActivity = await teamActivity.update(
      {
        com_to_team: comment,
        status: 5
      },
      { returning: true }
    );

    return updatedActivity;
  }

  // 存储队伍中指导老师和学生成员的信息
  static async saveInstructorAndMembers(instructorData, membersData) {
    try {
      const existingInstructor = await db.teacher.findOne({ where: { id: instructorData.id } });
      // 如果存在该指导教师，则删除其信息
      if (existingInstructor) {
        await existingInstructor.destroy();
      }
      // 保存指导老师信息
      const instructor = await db.teacher.create(instructorData);

      // 保存队伍成员信息
      const members = await Promise.all(membersData.map(async memberData => {
        // 查询数据库中是否存在该成员
        const existingMember = await db.teammember.findOne({ where: { id: memberData.id } });

        // 如果存在该成员，则删除该成员的信息
        if (existingMember) {
          await existingMember.destroy();
        }

        // 创建新的成员信息
        return db.teammember.create(memberData);
      }));

      return { instructor, members };
    } catch (error) {
      throw error;
    }
  }

  //审核队伍
  static async approveTeam(id,approve) {
    const team = await db.team.findByPk(id);
    if (!team) {
      return null; // 返回null表示队伍不存在
    }
    await team.update(
      {
        status: approve
      },
      { returning: true }
    );
    return team;
    
  }

  static async getFavorite(team_id, activity_id) {
    return await db.favorate.findOne({ where: { team_id, activity_id } });
  }

  static async createFavorite(team_id, activity_id) {
    return await db.favorate.create({ team_id, activity_id });
  }

  static async deleteFavorite(team_id, activity_id) {
    // 已经检查过一定存在 直接删除
    return await db.favorate.destroy({
      where: {
          team_id: team_id,
          activity_id: activity_id
      }
    });
  }

  static async findEvent(activ_id, team_id){
    // 检查数据库中是否存在相同的记录
    const existingEvent = await db.teamactivity.findOne({
      where: {
          activity_id: activ_id,
          team_id: team_id,
      }
    });
    console.log("debug02:",existingEvent);
    return existingEvent;
  }

  static async registerEvent(activ_id, team_id){
    try {
      // 在这里进行报名活动的操作，例如创建新记录等
      const result = await db.teamactivity.create({
          activity_id: activ_id,
          team_id: team_id,
          admission_status: 1 // 默认为待录取状态
      });      
      return { admission_status: result.admission_status };
    } catch (error) {
        throw error;
    }
  }

  static async getRecommend(city, province){
    try {
      // 在这里编写获取活动推荐列表的逻辑
      // 假设根据省份和城市查询数据库中的活动信息
      const recommendations = await db.activity.findAll({
          where: {
              province: province,
              city: city
          },
          limit: 10 // 限制返回结果数量为 10 条
      });
      
      return recommendations;
    } catch (error) {
        throw error;
    }
  }

}

module.exports = teamService;