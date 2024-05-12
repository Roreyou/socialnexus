//services/teamService.js
const db = require('../models/index');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const ActivityService = require('./activityService');
const CommunityService = require('./communityService');
const post = require('../models/post');
const activity = require('../models/activity');

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

  static async getTeamAvatar(teamId){
    const teamAvatar = await db.team.findOne({
      where: {
      id: teamId
      },
      attributes:['avatar'] 
    });
    return teamAvatar;
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


  static async getRecommend(city, province, page){
    try {
      // 在这里编写获取活动推荐列表的逻辑
      // 假设根据省份和城市查询数据库中的活动信息
      const activities = await db.activity.findAll({
          where: {
              province: province,
              city: city
          },
          limit: 10 // 限制返回结果数量为 10 条
      });
      const recommendations = await ActivityService.getCategKeyCommuIdsMap(activities);
      const results = await ActivityService.getPageData(page, recommendations);
      return results;
    } catch (error) {
        throw error;
    }
  }

  // 根据给定的单个队伍id找到队伍名
  static async getTeamName(id){
    try {
      const team = await db.team.findOne({
          where: {
              id: id
          },
          attributes:['team_name'] 
      });
      if (team) {
          return team;
      } else {
          throw new Error('Team not found');
      }
    } catch (error) {
        console.error('Error getting team map name:', error);
        return "Default Team Name"; // 或者执行其他适当的错误处理逻辑
    }
  }

  static async FindTeam(teamId){
    // 获取队伍信息
    const teamInfo = await db.team.findOne({ where: { id: teamId } });
    console.log("team：",teamInfo);
    if (!teamInfo) {
      return false;
    }
    else{
      return true;
    }
  }

  static async getTeamInfo(teamId) {
    try {
      // 获取队伍信息
      
      const teamInfo = await db.team.findOne({ where: { id: teamId } });
      const school = await db.school.findByPk(teamInfo.school_id);
      const leader = await db.teammember.findByPk(teamInfo.leader_id);
      const instructor = await db.teacher.findByPk(teamInfo.instructor_id);
      const menNum = await db.teammember.count({where:{team_id: teamInfo.id}});
      console.log(teamInfo);
      const updateTeamInfo = {
        ...teamInfo.dataValues,
        school_name: school.name,
        leader_name: leader.name,
        instructor_name: instructor.name,
        mem_num: menNum
      };
      console.log(updateTeamInfo);
      // 获取指导老师信息
      const instructorInfo = await db.teacher.findOne({ where: { id: teamInfo.instructor_id } });

      // 获取队伍成员信息
      const memberInfo = await db.teammember.findAll({ where: { team_id: teamId } });

      // 组合数据
      const responseData = {
        team_info: updateTeamInfo,
        leader_info:leader,
        member_info: memberInfo,
        instructor_info: instructorInfo
      };
      console.log(responseData);
      return responseData ;
    } catch (error) {
      console.error('Failed to get team info:', error);
      return { code: '500', msg: 'Failed to get team info', data: null };
    }

  }

  static async getTeamFavorites(my_id) {
    const favoActiIds = await db.favorate.findAll({
      where: { team_id: my_id }
    });      
    
    // 将查询到的活动 ID 转换为数组
    const activityIdsArray = favoActiIds.map(activity => activity.activity_id);

    const teamFavorites = await db.activity.findAll({
      where:{
        id: activityIdsArray
      }
    }); 
    const results = await ActivityService.getCategKeyCommuIdsMap(teamFavorites);
    return results;
  }

  static async commentActivity(teamId, activityId, comment){
    try {
      let teamActivity = await db.teamactivity.findOne({
          where: {
              team_id: teamId,
              activity_id: activityId
          }
      });

      if (teamActivity) {
          if (teamActivity.comment_status == '2') {
              return {
                  code: 200,
                  msg: 'Activity have already been commented!'
              };
          } else {              
              console.log("debug:", comment);
              await teamActivity.update({
                  comment_status: '2',
                  team_to_activity: comment,
              });
              return {
                  code: 200,
                  msg: 'comment activity successfully!',
                  data: {
                      comment_status: '2'
                  }
              };
          }
      } else {
          return {
              code: -1,
              msg: 'Can not find any activity!'
          };
      }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ code: 500, msg: 'Failed to comment activity' });
    }

  }

  static async getMyComments(team_id, activity_id){
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
        where: {
            team_id: team_id
        }
      });
  
      // 定义用于存储评价信息的数组
      const comments = [];
  
      // 遍历查询结果，将每条记录的评价信息添加到数组中
        for (const teamActivity of teamActivities) {
          // 在activity表中查找对应的活动名称
          const activity = await db.activity.findOne({
            where: {
                id: teamActivity.activity_id
            }
          });          
          comments.push({
            activity_name: activity ? activity.name : null,
              team_to_activity: teamActivity.team_to_activity,
              comment_status: teamActivity.comment_status,
              time:teamActivity.team_to_activity_time
          });
        }
        return comments;  
      
      } catch (error) {
          // 处理异常情况
          console.error('Error:', error);
          throw error;
      }
  }

  static async getCommunityComments(team_id){
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
          where: {
              team_id: team_id
          }
      });

      // 创建一个用于存储结果的数组
      const results = [];

      // 遍历团队活动记录
      for (const teamActivity of teamActivities) {
          // 在activity表中查找对应的活动名称
          const activity = await db.activity.findOne({
              where: {
                  id: teamActivity.activity_id
              }
          });

          // 获取社区基层名字
          const communityName = await CommunityService.getCommunityNameById(activity.community_id);

          // 将查询到的活动名称和团队评论信息添加到结果数组中
          results.push({
              activity_name: activity ? activity.name : null,
              com_to_team: teamActivity.com_to_team,
              acti_time: activity.start_time,
              community_name: communityName,
          });
      }

      // 返回结果
      return results;
    } catch (error) {
        // 处理异常情况
        console.error('Error:', error);
        throw error;
    }
  }

  static async getMyCommentsFinished(teamId){
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
        where: {
            team_id: teamId,
            comment_status:2
        }
      });
  
      // 定义用于存储评价信息的数组
      const comments = [];
  
      // 遍历查询结果，将每条记录的评价信息添加到数组中
        for (const teamActivity of teamActivities) {
          // 在activity表中查找对应的活动名称
          const activity = await db.activity.findOne({
            where: {
                id: teamActivity.activity_id
            }
          });          
          comments.push({
            activity_name: activity ? activity.name : null,
              team_to_activity: teamActivity.team_to_activity,
              com_time: teamActivity.team_to_activity_time,
              acti_time:activity.start_time
          });
        }
        return comments;  
      
      } catch (error) {
          // 处理异常情况
          console.error('Error:', error);
          throw error;
      }
  }

  static async getMyCommentsUnfinished(teamId){
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
        where: {
            team_id: teamId,
            comment_status:1
        }
      });
  
      // 定义用于存储评价信息的数组
      const comments = [];
  
      // 遍历查询结果，将每条记录的评价信息添加到数组中
        for (const teamActivity of teamActivities) {
          // 在activity表中查找对应的活动名称
          const activity = await db.activity.findOne({
            where: {
                id: teamActivity.activity_id
            }
          });          
          comments.push({
            activity_name: activity ? activity.name : null,
            acti_content: activity ? activity.remark : null,
            acti_time:activity.start_time,
            acti_id: activity.id.toString()
          });
        }
        return comments;  
      
      } catch (error) {
          // 处理异常情况
          console.error('Error:', error);
          throw error;
      }
  }

  static async getIsRegister(team_id, acti_id){
    const teamActivity = await db.teamactivity.findOne({
      where:{
        activity_id: acti_id,
        team_id: team_id
      }
    });
    console.log(teamActivity);
    if(!teamActivity){
      return {
        flag: "0",
        acti_status: 0
      };
    }
    const activity = await ActivityService.getActivityById(teamActivity.activity_id);
    console.log(activity);
    return {
      flag:"1",
      acti_status:activity.activity_status
    };
  }

  // 修改队伍信息，送去团委审核
  static async modifyInfo(team_id, instrData, leaderData, membersData){
    try {
      // 存入指导员信息
      const modifyInstructor = {
        ...instrData,
        team_id:team_id
      };
      await teamService.insertInstructor(modifyInstructor);
      // 存入队长信息
      const modifyLeader = {
        ...leaderData,
        team_id:team_id
      };
      await teamService.insertLeader(modifyLeader);

      // 存入队伍成员
      await teamService.addTeamMembers(team_id, membersData);

      // 将修改审核字段设置为1
      await db.team.update({ modification_status: 1 }, { where: { id: team_id } });

      return 'Team information will be verified again!' ;
    } catch (error) {
        throw new Error('Failed to update team information: ' + error.message);
    }
  }

  static async insertInstructor(instrData) {
        await db.modify_teacher.create(instrData);
  }

  static async insertLeader(leaderData) {
          await db.modify_teammember.create(leaderData);
  }

  static async addTeamMembers(team_id, membersData) {
      await Promise.all(membersData.map(memberData => db.modify_teammember.create({
          team_id: team_id,
          ...memberData
      })));
  }

  static async modifyPwd(identity, old_pwd, new_pwd, user_id){
    try {
      // 根据身份（如teacher、student等）和用户ID检查用户是否存在
      const user = await teamService.getUserByIdentityAndId(identity, user_id);

      // 验证旧密码是否正确
      const passwordMatch = await bcrypt.compare(old_pwd, user.pwd);

      if (!passwordMatch) {
        throw new Error('密码错误');
      }

      // 更新密码
      await teamService.updateUserPassword(identity, user_id, new_pwd);

      return 'Password changed successfully' ;
    } catch (error) {
        throw new Error('Failed to change password: ' + error.message);
    }
  }

  // 根据身份和用户ID从数据库中获取用户信息
  static async  getUserByIdentityAndId(identity, userId) {
    if (identity == '1') { // 是队长
        return await db.teammember.findByPk(userId);
    }else if(identity == '2'){// 是队员
        return await db.teammember.findOne({
          where:{id:userId}
        });
    } else if (identity == '3') { //是指导老师
        return await db.teacher.findByPk(userId);
    }
  }

  static async updateUserPassword(identity, userId, newPassword) {
    // 更新用户密码
    // 加密密码
    const hash_pwd = await bcrypt.hash(newPassword, 10);
    if (identity == '1') { // 是队长
      await db.teammember.update({ pwd: hash_pwd }, { where: { id: userId } }); 
    } if(identity == '2' ){ // 是队员
      await db.teammember.update({ pwd: hash_pwd }, { where: { id: userId } }); 
    }else if (identity == '3'){ //是指导老师
      await db.teacher.update({ pwd: hash_pwd }, { where: { id: userId } });
    }
  }

  static async getLeaderNameById(leaderId){
      const leader = await db.teammember.findOne({
        where: {
            id: leaderId
        },
        attributes:['name'] 
      });
      return leader.name;
  }

  static async getInstructorNameById(instructorId){
    const instructor = await db.teacher.findOne({
      where: {
          id: instructorId
      },
      attributes:['name'] 
    });
    return instructor.name;
  }

  static async getLeaderById(leaderId){
    const leader = await db.teammember.findOne({
      where: {
          id: leaderId
      }
    });
    return leader;
  }

  static async getInstructorById(instructorId){
    const instructor = await db.teacher.findOne({
      where: {
          id: instructorId
      },
    });
    return instructor;
  }

  static async getTeamActivityById(teamId, activityId){
    const result = db.teamactivity.findOne({
      where:{
        team_id:teamId,
        activity_id:activityId
      }
    });
    return result;
  }
}

module.exports = teamService;