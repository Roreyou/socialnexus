//services/teamService.js
const db = require('../models/index');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const ActivityService = require('./activityService');
const CommunityService = require('./communityService');
const otherService = require('./otherService');
const post = require('../models/post');
const activity = require('../models/activity');
const teammember = require('../models/teammember');
const { raw } = require('body-parser');
const teamactivity = require('../models/teamactivity');
const ImageService = require('./imageService');
const { Op } = require('sequelize');
const { commentOnPost } = require('./commentService');
const short = require('short-uuid');
const Result = require('../common/Result');
const moment = require('moment');





class teamService {
  static async getAllTeams() {
    return await db.team.findAll();
  }

  static async createTeam(teamData) {
    return await db.team.create(teamData);
  }

  static async getUpdatedTeamInfo(modified_id) {
    // console.log(teamId, modified_time)
    try {
      const updatedTeachers = await db.modify_teacher.findAll({
        where: {
          modified_id: modified_id
        }
      });

      // console.log(updatedTeachers);
      if (updatedTeachers.length == 0)
        return null;

      const teamsDetails = await Promise.all(updatedTeachers.map(async (updatedTeacher) => {

        const updatedTeacherInfo = updatedTeacher.dataValues;
        const formattedDate = moment(updatedTeacherInfo.modified_time).format("YYYY-MM-DD HH:mm:ss");
        // const teamId=updatedTeacherInfo.team_id;

        try {
          const team = await this.getTeamById(updatedTeacherInfo.team_id);
          const teamInfo = team.team_info;
          const instructorInfo = team.instructor_info;

          const modiStatus = updatedTeacherInfo.modified_status == 1 ? '未审核' : '已审核';

          const members = await db.modify_teammember.findAll({
            where: {
              modified_id: modified_id
            },
            attributes: ['id', 'team_id', 'name', 'tel', 'major', 'email', 'grade'],
          });

          teamInfo.instructor_id = updatedTeacherInfo.id;
          teamInfo.instructor_name = updatedTeacherInfo.name;
          teamInfo.modified_status = updatedTeacherInfo.modified_status;
          teamInfo.modi_status = modiStatus;
          teamInfo.mem_num = members ? members.length.toString() : '0';
          teamInfo.modi_time = formattedDate;

          // console.log(teamInfo);




          instructorInfo.id = updatedTeacherInfo.id;
          instructorInfo.name = updatedTeacherInfo.name;
          instructorInfo.email = updatedTeacherInfo.email;
          instructorInfo.major = updatedTeacherInfo.major;
          instructorInfo.tel = updatedTeacherInfo.tel;

          // console.log(instructorInfo);


          return {
            team_info: teamInfo,
            instructor_info: instructorInfo,
            members_list: members,
          };
        } catch (error) {
          console.error("Error getting team info:", error);
          return null;
        }
      }));
      // console.log("teamsDetails", teamsDetails);
      return teamsDetails;
    } catch (error) {
      console.error("Error fetching updated teachers:", error);
      // Handle or log the error as needed
    }
  }

  static async getUpdatedTeams(status) {
    let whereCondition;
    if (status == 1) {
      whereCondition = {
        modified_status: {
          [Op.or]: [2, 3]
        }
      };
    } else if (status == 2) {
      whereCondition = {
        modified_status: 1
      };
    } else if (status == 0) {
      whereCondition = {
        modified_status: {
          [Op.or]: [1, 2, 3]
        }
      };
    }
    try {
      const updatedTeachers = await db.modify_teacher.findAll({
        where: whereCondition,
        order: [['modified_time', 'DESC']]
      });

      if (updatedTeachers.length == 0)
        return null;

      const teamsDetails = await Promise.all(updatedTeachers.map(async (updatedTeacher) => {
        const updatedTeacherInfo = updatedTeacher.dataValues;
        console.log("updatedTeacherInfo", updatedTeacherInfo);
        // 日期格式
        const formattedDate = moment(updatedTeacherInfo.modified_time).format("YYYY-MM-DD HH:mm:ss");

        console.log(formattedDate);
        try {
          const team = await this.getTeamById(updatedTeacherInfo.team_id);
          const teamInfo = team.team_info;
          console.log("teamInfo", teamInfo);

          const modiStatus = updatedTeacherInfo.modified_status == 1 ? '未审核' : '已审核';
          console.log("modiStatus", modiStatus);

          return {
            ...teamInfo,
            instructor_id: updatedTeacherInfo.id,
            instructor_name: updatedTeacherInfo.name,
            modified_status: updatedTeacherInfo.modified_status,
            modi_status: modiStatus,
            modi_time: formattedDate,
            modified_id: updatedTeacherInfo.modified_id,

            modification_status: undefined
          };
        } catch (error) {
          console.error("Error getting team info:", error);
          return null; // or handle the error accordingly
        }
      }));
      console.log("teamsDetails", teamsDetails);
      return teamsDetails;
    } catch (error) {
      console.error("Error fetching updated teachers:", error);
      // Handle or log the error as needed
    }
  }

  static async reviewUpdatedTeam(modified_id, approve) {
    if (approve == 1) {
      await this.approveUpdatedTeam(modified_id);
    } else {
      await this.rejectUpdatedTeam(modified_id);
    }
  }


  static async rejectUpdatedTeam(modified_id) {
    console.log("modified_id", modified_id);
    const transaction = await db.sequelize.transaction({
        isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ, // 可选，设置隔离级别
    });
    try {
        // 修改状态
        const team = await db.modify_teacher.findOne({where:{modified_id:modified_id},attributes: ['team_id']});
        const teamId = team.team_id;
        console.log("teamId", teamId);
        await db.modify_teacher.update({ modified_status: 3 }, { where: { modified_id: modified_id }, transaction });
        await db.modify_teammember.update({ modified_status: 3 }, { where: { modified_id: modified_id }, transaction });
        await db.team.update({ modification_status: 3 }, { where: { id: teamId }, transaction });
        // 提交事务
        await transaction.commit();

    } catch (error) {
        // 回滚事务
        await transaction.rollback();
        throw error;
    }
  }


  static async approveUpdatedTeam(modified_id) {
    const transaction = await db.sequelize.transaction({
      isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ, // 可选，设置隔离级别
    });
    // 通过
    const updatedInfo = await this.getUpdatedTeamInfo(modified_id);

    try {

      // 更新老师表
      // console.log("updatedInfo", updatedInfo);
      const instructorInfo = updatedInfo[0].instructor_info.dataValues;
      // console.log("instructorInfo", instructorInfo);
      // console.log("instructorInfo_id", instructorInfo.id);
      if (await db.teacher.findAll({ where: { id: instructorInfo.id } }) == null) {
        await db.teacher.create(instructorInfo, { transaction });
      } else {
        await db.teacher.update(instructorInfo, { where: { id: instructorInfo.id }, transaction }, transaction);
      }

      // 更新队伍表
      console.log("updatedInfo", updatedInfo);
      const teamInfo = updatedInfo[0].team_info;
      console.log("teamInfo", teamInfo);
      await db.team.update(teamInfo, { where: { id: teamInfo.id } }, transaction);

      // 更新队员表
      const membersInfo = updatedInfo[0].members_list;
      // console.log("membersInfo", membersInfo);
      // 假设membersInfo是一个对象数组，每个对象包含成员的ID和更新后的信息
      for (let m of membersInfo) {
        const member=m.dataValues
        console.log("member", member);
        // 检查成员是否已经存在于数据库中
        if (await db.teammember.findOne({ where: { id: member.id, team_id: member.team_id } }) == null) {
          await db.teammember.create(member, { transaction });
        } else {
          await db.teammember.update(member, { where: { id: member.id, team_id: member.team_id }, transaction });
        }
      }

      // 修改状态
      await db.modify_teacher.update({ modified_status: 2 }, { where: { modified_id: modified_id }, transaction });
      await db.modify_teammember.update({ modified_status: 2 }, { where: { modified_id: modified_id }, transaction });
      await db.team.update({ modification_status: 2 }, { where: { id: teamInfo.id }, transaction });

      // 如果所有操作都成功，提交事务
      await transaction.commit();
    } catch (error) {
      // 如果任何一个操作失败，回滚事务
      await transaction.rollback();
      throw error; // 可以选择处理错误，或者将其传播给调用者
    }
  }

  static async getMyTeams(id, identity) {
    db.teammember.belongsTo(db.team, { foreignKey: 'team_id' });
    //队员
    if (identity == 0) {
      const teams = await db.teammember.findAll({
        where: { id: id },
        include: [
          {
            model: db.team,
            attributes: ['id', 'team_name', 'avatar']
          },
        ],
        attributes: ['id', 'team_id'], // 在teammember表中指定要返回的字段
        raw: true
      });

      if (!teams || teams.length === 0) return null;

      console.log(teams);

      // 使用map方法改变字段名
      const modifiedTeams = teams.map(team => {
        return {
          team_id: team.team_id,
          team_name: team['schoolteam.team_name'],
          avatarUrl: team['schoolteam.avatar']
        };
      });

      return modifiedTeams;
    }

    else if (identity == 1) {
      //指导老师
      const teams = await db.team.findAll({
        where: { instructor_id: id }
      });

      console.log(teams);
      if (!teams || teams.length === 0) return null;

      // 使用map方法改变字段名
      const modifiedTeams = teams.map(team => {
        return {
          team_id: team.id,
          team_name: team.team_name,
          avatarUrl: team.avatar
        };
      });

      return modifiedTeams;

    }
  }

  static async getTeamById(id) {
    // 建立关联关系
    db.team.belongsTo(db.teammember, { foreignKey: 'leader_id' });
    db.team.belongsTo(db.teacher, { foreignKey: 'instructor_id' });
    db.team.belongsTo(db.school, { foreignKey: 'school_id' });

    const team = await db.team.findOne({
      where: { id: id },
      include: [
        {
          model: db.teammember,
          attributes: [['name', 'leader_name']] // 将 name 字段命名为 leader_name
        },
        {
          model: db.teacher,
          attributes: [['name', 'instructor_name']] // 可以同样对老师的 name 字段进行命名
        }

      ],
      raw: true
    });

    if (!team) {
      return null; // 处理未找到团队信息的情况
    }

    const instructor = await db.teacher.findByPk(team.instructor_id);

    const members = await db.teammember.findAll({
      where: {
        team_id: id
      }

    });


    const school = await db.school.findOne({ where: { id: team.school_id } });
    const schoolName = school ? school.name : null;
    const formattedTeamInfo = {
      ...team,
      leader_name: team["teammember.leader_name"],
      instructor_name: team["teacher.instructor_name"],
      mem_num: members ? members.length.toString() : '0',
      school_name: schoolName,
      'teammember.leader_name': undefined,
      'teacher.instructor_name': undefined,
    };

    return {
      "team_info": formattedTeamInfo,
      "instructor_info": instructor,
      "members_list": members,
    };
  }


  // team是审核注册状态
  static async getTeamByStatus(status) {
    let teamsToReturn;
    let whereCondition;

    console.log(status);
    // 根据不同的 status 设置不同的查询条件
    // 已审核
    if (status == 1) {
      whereCondition = {
        verification_status: {
          [Op.or]: [2, 3]
        }
      };
      //未审核
    } else if (status == 2) {
      whereCondition = {
        verification_status: 4
      };
      // 全部
    } else if (status == 0) {
      whereCondition = {
        verification_status: {
          [Op.or]: [2, 3, 4]
        }
      };

    }

    // 建立关联关系
    db.team.belongsTo(db.teammember, { foreignKey: 'leader_id' });
    db.team.belongsTo(db.teacher, { foreignKey: 'instructor_id' });
    db.team.belongsTo(db.school, { foreignKey: 'school_id' });

    // 查询团队信息及关联的团队成员和老师，修改字段命名
    const teams = await db.team.findAll({
      where: whereCondition,
      include: [
        {
          model: db.teammember,
          as: 'teammember',
          attributes: [['name', 'leader_name']] // 将 name 字段命名为 leader_name
        },
        {
          model: db.teacher,
          as: 'teacher',
          attributes: [['name', 'instructor_name']] // 可以同样对老师的 name 字段进行命名
        },
      ],
      raw: true // 返回原始 JSON 对象
    });

    // 根据 status 设置不同的状态值
    teamsToReturn = await Promise.all(teams.map(async team => {
      const school = await db.school.findOne({ where: { id: team.school_id } });
      const schoolName = school ? school.name : null;
      return {
        ...team,
        veri_status: team.verification_status == 4 ? '未审核' : '已审核',
        leader_name: team["teammember.leader_name"],
        instructor_name: team["teacher.instructor_name"],
        school_name: schoolName,

        'teammember.leader_name': undefined,
        'teacher.instructor_name': undefined,
      };
    }));
    // 假设 teams 是从数据库查询得到的结果数组
    const uniqueTeams = teamsToReturn.filter((team, index, self) =>
      index === self.findIndex(t => (
        t.id === team.id // 根据唯一标识属性去重，假设这里使用 id
      ))
    );

    return uniqueTeams;
  }


  //依据社区和状态,这里的status是社区对队伍的录取状态和评价状态
  static async getTeamByCommu(commu_id, status) {
    let whereCondition_commu = {};
    let whereCondition_status = {};
    if (commu_id !== '0') {
      whereCondition_commu.community_id = commu_id;
    }
    if (status != 0) {
      if (status == 4 || status == 5) {
        whereCondition_status.comment_status = status - 3
        whereCondition_status.admission_status = 2
      }
      if (status == 1 || status == 2 || status == 3) {
        whereCondition_status.admission_status = status
      }
    }


    const activities = await db.activity.findAll({
      where: whereCondition_commu,
      attributes: ['id']
    });

    const activityIds = activities.map(activity => activity.id);
    // console.log(activityIds)

    if (activityIds.length === 0) {
      return null;
    }

    // 创建一个新的对象来保存拼接后的 whereCondition_status
    const updatedWhereCondition_status = { ...whereCondition_status, activity_id: { [Op.in]: activityIds } };


    console.log(updatedWhereCondition_status)

    const teamActivities = await db.teamactivity.findAll({
      where: updatedWhereCondition_status,
      attributes: ['team_id']
    });

    const teamIds = teamActivities.map(teamActivity => teamActivity.team_id);

    console.log(teamIds)

    if (teamIds.length === 0) {
      return null;
    }

    // 建立关联关系
    db.team.belongsTo(db.teammember, { foreignKey: 'leader_id' });
    db.team.belongsTo(db.teacher, { foreignKey: 'instructor_id' });
    db.team.belongsTo(db.school, { foreignKey: 'school_id' });

    const teams = await db.team.findAll({
      where: {
        id: {
          [db.Sequelize.Op.in]: teamIds
        }
      },
      include: [
        {
          model: db.teammember,
          as: 'teammember',
          attributes: [['name', 'leader_name']] // 将 name 字段命名为 leader_name
        },
        {
          model: db.teacher,
          as: 'teacher',
          attributes: [['name', 'instructor_name']] // 可以同样对老师的 name 字段进行命名
        }
      ],
      raw: true // 返回原始 JSON 对象
    });
    console.log(teams)

    let teamsToReturn
    // teamsToReturn = teams.map(team => ({
    //   ...team,
    //   veri_status: team.verification_status === 4 ? '未审核' : '已审核', // 根据 verification_status 设置 veri_status
    //   leader_name: team["teammember.leader_name"], // 将 "teammember.leader_name" 改为 "leader_name"
    //   instructor_name: team["teacher.instructor_name"],
    //   // 删除原始的字段名
    //   // 如果还有其他字段需要删除，也可以在这里添加
    //   // 这样返回的对象中将只包含你想要的字段名
    //   'teammember.leader_name': undefined,
    //   'teacher.instructor_name': undefined,
    // }));
    // // 根据 status 设置不同的状态值
    teamsToReturn = await Promise.all(teams.map(async team => {
      const school = await db.school.findOne({ where: { id: team.school_id } });
      const schoolName = school ? school.name : null;
      return {
        ...team,
        veri_status: team.verification_status == 4 ? '未审核' : '已审核',
        leader_name: team["teammember.leader_name"],
        instructor_name: team["teacher.instructor_name"],
        school_name: schoolName,
        status: status,

        'teammember.leader_name': undefined,
        'teacher.instructor_name': undefined,
        'pwd': undefined
      };
    }));

    // 声明一个临时数组来存储已经处理过的团队 ID
    let processedTeamIds = [];

    // 使用 filter 函数对 teams 数组进行筛选
    teamsToReturn = teamsToReturn.filter(team => {
      // 如果当前团队的 ID 已经在 processedTeamIds 中存在，则返回 false，表示需要去重
      if (processedTeamIds.includes(team.id)) {
        return false;
      } else {
        // 否则将当前团队的 ID 添加到 processedTeamIds 中，并返回 true
        processedTeamIds.push(team.id);
        return true;
      }
    });

    // 最后返回去重后的 teamsToReturn 数组
    return teamsToReturn;
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

  static async getTeamActByCommu(commu_id, status) {
    const teams_by_commu = await this.getTeamByCommu(commu_id, status);
    // console.log(teams_by_commu)

    let idList = [];

    if (teams_by_commu && teams_by_commu.length > 0) {
      idList = teams_by_commu.map(team => team.id);
      console.log(idList)
    } else {
      return null;
    }


    // 建立关联关系
    db.teamactivity.belongsTo(db.team, { foreignKey: 'team_id' });
    db.teamactivity.belongsTo(db.activity, { foreignKey: 'activity_id' });
    db.team.belongsTo(db.school, { foreignKey: 'school_id' });

    const teamActivities = await db.teamactivity.findAll({
      where: {
        team_id: {
          [Op.in]: idList
        }
      },
      include: [
        {
          model: db.team,
          as: 'schoolteam',
          attributes: ['team_name', 'school_id']
        },
        {
          model: db.activity,
          as: 'activity',
          attributes: [['name', 'activity_name']]
        },
      ],
      raw: true // 返回原始 JSON 对象
    });

    // console.log(teamActivities)
    const teamsToReturn = await Promise.all(teamActivities.map(async team => {
      // 获取学校名称
      const school = await db.school.findOne({ where: { id: team['schoolteam.school_id'] } });
      const schoolName = school ? school.name : null;
      let status;
      if(team.admission_status==1) status='待录取';
      if(team.admission_status==2&&team.comment_status==1) status='待评价';
      if(team.comment_status==2) status='已评价';
      if(team.admission_status==3) status='未通过';


      return {
        ...team,
        team_name: team["schoolteam.team_name"],
        activity_name: team["activity.activity_name"],
        school_name: schoolName,
        status: status,
        // 删除原始的字段名
        // 如果还有其他字段需要删除，也可以在这里添加
        // 这样返回的对象中将只包含你想要的字段名
        'activity.activity_name': undefined,
        'schoolteam.team_name': undefined,
        'school.school_id': undefined
      };
    }));

    return teamsToReturn;
  }

  static async queryTeamActByName(commu_id, team_name) {
    const teams_by_commu = await this.getTeamByCommu(commu_id, 0);
    // console.log(teams_by_commu)
    let teamsFiltered = [];
    let idList = [];

    if (teams_by_commu && teams_by_commu.length > 0) {
      //继续模糊查询by_teamName
      const fuzzyTeamName = team_name;
      teamsFiltered = teams_by_commu.filter(team => team.team_name.includes(fuzzyTeamName));
      idList = teamsFiltered.map(team => team.id);
      // console.log(idList)
    } else {
      return null;
    }

    if (teamsFiltered.length === 0)
      return null;

    // 建立关联关系
    db.teamactivity.belongsTo(db.team, { foreignKey: 'team_id' });
    db.teamactivity.belongsTo(db.activity, { foreignKey: 'activity_id' });
    db.team.belongsTo(db.school, { foreignKey: 'school_id' });

    const teamActivities = await db.teamactivity.findAll({
      where: {
        team_id: {
          [Op.in]: idList
        }
      },
      include: [
        {
          model: db.team,
          as: 'schoolteam',
          attributes: ['team_name', 'school_id']
        },
        {
          model: db.activity,
          as: 'activity',
          attributes: [['name', 'activity_name']]
        },
      ],
      raw: true // 返回原始 JSON 对象
    });

    // console.log(teamActivities)
    const teamsToReturn = await Promise.all(teamActivities.map(async team => {
      // 获取学校名称
      const school = await db.school.findOne({ where: { id: team['schoolteam.school_id'] } });
      const schoolName = school ? school.name : null;

      return {
        ...team,
        team_name: team["schoolteam.team_name"],
        activity_name: team["activity.activity_name"],
        school_name: schoolName,
        // 删除原始的字段名
        // 如果还有其他字段需要删除，也可以在这里添加
        // 这样返回的对象中将只包含你想要的字段名
        'activity.activity_name': undefined,
        'schoolteam.team_name': undefined,
        'school.school_id': undefined
      };
    }));

    return teamsToReturn;
  }
  static async queryTeamByName(community_id, name) {
    const teams_by_commu = await this.getTeamByCommu(community_id, 0);
    if (!teams_by_commu)
      return null;

    // 继续模糊查询 by_teamName
    const fuzzyTeamName = name;
    const teamsFiltered = teams_by_commu
      .filter(team => team.team_name.includes(fuzzyTeamName))
    // .map(({ tel, ...rest }) => rest); // 去除 tel 字段

    if (teamsFiltered.length === 0)
      return null;

    return teamsFiltered;
  }

  static async queryTeamActByAct(commu_id, act_name) {
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


    // 建立关联关系
    db.teamactivity.belongsTo(db.team, { foreignKey: 'team_id' });
    db.teamactivity.belongsTo(db.activity, { foreignKey: 'activity_id' });
    db.team.belongsTo(db.school, { foreignKey: 'school_id' });

    const teamActivities = await db.teamactivity.findAll({
      where: whereCondition_act,
      include: [
        {
          model: db.team,
          as: 'schoolteam',
          attributes: ['team_name', 'school_id']
        },
        {
          model: db.activity,
          as: 'activity',
          attributes: [['name', 'activity_name']]
        },
      ],
      raw: true // 返回原始 JSON 对象
    });

    // console.log(teamActivities)
    const teamsToReturn = await Promise.all(teamActivities.map(async team => {
      // 获取学校名称
      const school = await db.school.findOne({ where: { id: team['schoolteam.school_id'] } });
      const schoolName = school ? school.name : null;

      return {
        ...team,
        team_name: team["schoolteam.team_name"],
        activity_name: team["activity.activity_name"],
        school_name: schoolName,
        // 删除原始的字段名
        // 如果还有其他字段需要删除，也可以在这里添加
        // 这样返回的对象中将只包含你想要的字段名
        'activity.activity_name': undefined,
        'schoolteam.team_name': undefined,
        'school.school_id': undefined
      };
    }));

    return teamsToReturn;

  }

  static async queryTeamByAct(commu_id, act_name) {
    let whereCondition_act = {};
    let whereCondition_teamactivity = {};

    //用活动名模糊查询
    whereCondition_act.name = {
      [Op.like]: '%' + act_name + '%'
    };

    const activities = await db.activity.findAll({
      where: whereCondition_act,
      attributes: ['id']
    });

    const activityIds = activities.map(activity => activity.id);
    // console.log("activityIds:",activityIds);

    if (activityIds.length === 0) {
      return null;
    }

    whereCondition_teamactivity.activity_id = {
      [Op.in]: activityIds
    }

    const teamactivities = await db.teamactivity.findAll({
      where: whereCondition_teamactivity,
      attributes: ['team_id']
    });

    const teamIds= teamactivities.map(teamactivity => teamactivity.team_id);
    // console.log("teamIDs:",teamIds);

    const teams_by_commu = await this.getTeamByCommu(commu_id, 0);
    if (!teams_by_commu)
      return null;


    // console.log("teamsByCommu",teams_by_commu)
    const teamsFiltered = teams_by_commu.filter(team => teamIds.includes(team.id));
    // console.log("teamsFiltered",teamsFiltered)



    if (teamsFiltered.length == 0)
      return null;

    return teamsFiltered;

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
      { admission_status: admit },
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
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    const updatedActivity = await teamActivity.update(
      {
        com_to_team: comment,
        comment_status: 2,
        com_to_team_time: formattedDate
      },
      { returning: true }
    );

    return updatedActivity;
  }

  // 存储队伍中指导老师和学生成员的信息
  static async saveInstructOrMembers(id, status, instructorData, leader, membersData) {
    try {
      if (status == 1 || status == 3) {
        // 初始化一个集合来存储唯一的 major 值
        var uniqueMajors = new Set();
        // 指导老师
        const existingInstructor = await db.teacher.findOne({ where: { id: instructorData.id } });
        // 如果存在该指导教师，则删除其信息
        if (existingInstructor) {
          await existingInstructor.destroy();
        }
        // 创建新的指导老师信息
        instructorData.pwd = await bcrypt.hash("123", 10);
        await db.teacher.create(instructorData);
        if (instructorData.major && !uniqueMajors.has(instructorData.major)) {
          uniqueMajors.add(instructorData.major);
        }


        const leaderId = await teamService.getLeaderIdByTeamId(id);
        // 队长信息
        const existingLeader = await db.teammember.findOne({ where: { id: leaderId } });
        // 如果存在该队长，则删除其信息
        var leaderPwd;
        if (existingLeader) {
          leaderPwd = existingLeader.pwd;
          await existingLeader.destroy();
        }
        // 创建新的队长信息
        leader.id = leaderId;
        leader.pwd = leaderPwd;
        await db.teammember.create(leader);
        if (leader.major && !uniqueMajors.has(leader.major)) {
          uniqueMajors.add(leader.major);
        }

        // 队伍成员信息
        await Promise.all(membersData.map(async memberData => {
          console.log(memberData);
          // 查询数据库中是否存在该成员
          const existingMember = await db.teammember.findOne({ where: { id: memberData.id, team_id: id } });
          console.log("debug:", existingMember);
          // 如果存在该成员，则删除该成员的信息
          if (existingMember) {
            console.log("debug 05");
            await existingMember.destroy();
          }
          // 为每个成员对象添加密码字段，并设置默认值
          memberData.pwd = await bcrypt.hash("123", 10);
          // 创建新的成员信息
          await db.teammember.create(memberData);
          if (memberData.major && !uniqueMajors.has(memberData.major)) {
            uniqueMajors.add(memberData.major);
          }
        }));
        // 将集合转换为字符串，使用逗号分隔每个 major 值
        const relevant_faculties = Array.from(uniqueMajors).join('， ');
        console.log("debuggg:", relevant_faculties);

        await db.team.update(
          {
            verification_status: 4,
            instructor_id: instructorData.id,
            relevant_faculties: relevant_faculties
          },
          { where: { id: id } }
        );
        const updateStatus = await db.team.findOne({ where: { id: id }, attributes: ['verification_status'] });
        console.log("debug verification_status:updateStatus", updateStatus);
        return { verification_status: updateStatus };
      }
      else {
        return { error: "the verification_status occur error! " };
      }

    } catch (error) {
      throw error;
    }
  }

  //审核队伍
  static async approveTeam(id, approve) {
    const team = await db.team.findByPk(id);
    if (!team) {
      return null; // 返回null表示队伍不存在
    }

    await db.team.update({ verification_status: approve + 1 }, { where: { id: id } });
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

  static async findEvent(activ_id, team_id) {
    console.log("debug:", activ_id, team_id);
    // 检查数据库中是否存在相同的记录
    const existingEvent = await db.teamactivity.findOne({
      where: {
        activity_id: activ_id,
        team_id: team_id,
      }
    });
    return existingEvent;
  }

  static async registerEvent(activ_id, team_id) {
    try {
      // 在这里进行报名活动的操作，例如创建新记录等
      const result = await db.teamactivity.create({
        activity_id: activ_id,
        team_id: team_id,
        admission_status: 1, // 默认为待录取状态
        comment_status: 1
      });
      return { admission_status: result.admission_status };
    } catch (error) {
      throw error;
    }
  }


  static async getRecommend(city, province, page) {
    try {
      // 在这里编写获取活动推荐列表的逻辑
      // 假设根据省份和城市查询数据库中的活动信息

      // 假设 province 和 city 是从某个地方获取的变量
      let whereConditions = {};

      // 如果 province 不是 null，则添加 province 条件
      if (province !== '') {
        whereConditions.province = province;
      }
      // 如果 city不是 null，则添加 city 条件
      if (city !== '') {
        whereConditions.city = city;
      }
      if (province == '中国区域') {
        whereConditions = {};
      }
      console.log(whereConditions);
      const activities = await db.activity.findAll({
        where: whereConditions,
        attributes: {
          include: [
            [
              //引用原生mySQL语法，将类型转化
              sequelize.literal("cast(id as char)"),
              'id'
            ],
            [
              //引用原生mySQL语法，将类型转化
              sequelize.literal("cast(category_id as char)"),
              'category_id'
            ],
          ]
        },
        limit: 10 // 限制返回结果数量为 10 条
      });
      const recommendations = await otherService.getCategKeyCommuIdsMap(activities);
      const results = await otherService.getPageData(page, recommendations);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // 根据给定的单个队伍id找到队伍名
  static async getTeamName(id) {
    try {
      const team = await db.team.findOne({
        where: {
          id: id
        },
        attributes: ['team_name']
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

  static async FindTeam(teamId) {
    // 获取队伍信息
    const teamInfo = await db.team.findOne({ where: { id: teamId } });
    console.log("team：", teamInfo);
    if (!teamInfo) {
      return false;
    }
    else {
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
      const menNum = await db.teammember.count({ where: { team_id: teamInfo.id } });
      console.log(teamInfo);
      console.log(school);
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
        leader_info: leader,
        member_info: memberInfo,
        instructor_info: instructorInfo
      };
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error('Failed to get team info:', error);
    }

  }

  static async getTeamFavorites(my_id) {
    const favoActiIds = await db.favorate.findAll({
      where: { team_id: my_id }
    });

    // 将查询到的活动 ID 转换为数组
    const activityIdsArray = favoActiIds.map(activity => activity.activity_id);

    const teamFavorites = await db.activity.findAll({
      where: {
        id: activityIdsArray
      },
      attributes: {
        include: [
          [
            //引用原生mySQL语法，将类型转化
            sequelize.literal("cast(id as char)"),
            'id'
          ],
        ]
      }
    });
    const results = await otherService.getCategKeyCommuIdsMap(teamFavorites);
    return results;
  }

  static async commentActivity(teamId, activityId, comment) {
    try {
      let teamActivity = await db.teamactivity.findOne({
        where: {
          team_id: teamId,
          activity_id: activityId
        }
      });

      if (teamActivity) {
        if (teamActivity.comment_status == '2') {

          return 'Activity have already been commented!';
        } else {
          await teamActivity.update({
            comment_status: '2',
            team_to_activity: comment,
            team_to_activity_time: await otherService.getCurrentTime()
          });
          return { comment_status: '2' }
        };
      }
      else {
        return 'Can not find any activity!';
      }
    } catch (error) {
      console.error('Error:', error);
      return 'Failed to comment activity';
    }

  }

  static async getMyComments(team_id, activity_id) {
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
          time: await otherService.changeTimeFormat(teamActivity.team_to_activity_time)
        });
      }
      return comments;

    } catch (error) {
      // 处理异常情况
      console.error('Error:', error);
      throw error;
    }
  }

  static async getCommunityComments(team_id) {
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
        where: {
          team_id: team_id,
          com_to_team: {
            [Op.ne]: null // 确保com_to_team字段不为空
          }
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
          acti_time: await otherService.changeTimeFormat(activity.start_time),
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

  static async getMyCommentsFinished(teamId) {
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
        where: {
          team_id: teamId,
          comment_status: 2,
          admission_status:2
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
          com_time: await otherService.changeTimeFormat(teamActivity.team_to_activity_time),
          acti_time: await otherService.changeTimeFormat(activity.start_time)
        });
      }
      return comments;

    } catch (error) {
      // 处理异常情况
      console.error('Error:', error);
      throw error;
    }
  }

  static async getMyCommentsUnfinished(teamId) {
    try {
      // 在数据库中查找符合条件的所有记录
      const teamActivities = await db.teamactivity.findAll({
        where: {
          team_id: teamId,
          comment_status: 1,
          admission_status:2
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
          acti_time: await otherService.changeTimeFormat(activity.start_time),
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

  static async getIsRegister(team_id, acti_id) {
    const teamActivity = await db.teamactivity.findOne({
      where: {
        activity_id: acti_id,
        team_id: team_id
      }
    });
    console.log(teamActivity);
    if (!teamActivity) {
      return {
        flag: "0",
        acti_status: 0
      };
    }
    const activity = await db.activity.findOne({ where: { id: teamActivity.activity_id } });
    console.log(activity);
    return {
      flag: "1",
      acti_status: activity.activity_status
    };
  }

  // 修改队伍信息，送去团委审核
  static async modifyInfo(team_id, instrData, leaderData, membersData) {
    try {
      //console.log(team_id);
      // 存入指导员信息
      delete instrData.pwd;
      //console.log("debug 01:", instrData);
      // 创建 short-uuid 实例
      const uuid = short();
      // 自动生成id，生成短UUID
      const shortId = uuid.new();
      const currentTime = await otherService.getCurrentTime();
      const modifyInstructor = {
        ...instrData,
        team_id: team_id,
        modified_status:1,
        modified_time:currentTime,
        modified_id:shortId
      };
      //console.log("debug 02:", modifyInstructor);
      await teamService.insertInstructor(modifyInstructor);
      //console.log("debug 03");
      // 存入队长信息
      delete leaderData.pwd;
      delete leaderData.team_id;
      //console.log("debug 04");

      const modifyLeader = {
        ...leaderData,
        team_id: team_id,
        modified_status:1,
        modified_time:currentTime,
        modified_id:shortId
      };
      console.log("debug 05:", modifyLeader);
      await teamService.insertLeader(modifyLeader);
      console.log("debug 066");
      // 存入队伍成员
      console.log("debug 077:", membersData);
      //await teamService.addTeamMembers(team_id, membersData);
      await Promise.all(
        membersData.map(async memberData => {
          // 创建一个新对象，不包含 pwd 字段
          const modifiedMemberData = 
          { ...memberData,
            team_id: team_id,
            modified_status:1,
            modified_time:currentTime,
            modified_id:shortId
          };
          console.log("debug 88", modifiedMemberData);
          delete modifiedMemberData.pwd;
          console.log("debug 99", modifiedMemberData);
          // 返回一个 Promise，该 Promise 由 db.modify_teammember.create 方法创建
          await db.modify_teammember.create(
            modifiedMemberData
          );
        })
      );

      // 将修改审核字段设置为1
      await db.team.update({ modification_status: 1 }, { where: { id: team_id } });

      return 'Team information will be verified again!';
    } catch (error) {
      throw new Error('Failed to update team information: ' + error.message);
    }
  }

  static async insertInstructor(instrData) {
    const ifexist = await db.modify_teacher.findOne({ where: { id: instrData.id, team_id: instrData.team_id } });
    console.log(ifexist);
    if (ifexist) {
      ifexist.destroy();
    }
    await db.modify_teacher.create(instrData);
  }

  static async insertLeader(leaderData) {
    try {
      const ifexist = await db.modify_teammember.findOne({ where: { id: leaderData.id, team_id: leaderData.team_id } });
      console.log(ifexist);
      if (ifexist) {
        ifexist.destroy();
      }
      await db.modify_teammember.create(leaderData);
    } catch (error) {
      console.log(error);
    }

  }

  static async addTeamMembers(team_id, membersData) {
    try {
      await Promise.all(
        membersData.map(async memberData => {
          // 创建一个新对象，不包含 pwd 字段
          const modifiedMemberData = 
          { ...memberData,
            modified_status:1,
            modified_time:currentTime,
            modified_id:shortId
          };
          console.log("debug 88", modifiedMemberData);
          delete modifiedMemberData.pwd;
          console.log("debug 99", modifiedMemberData);
          // 返回一个 Promise，该 Promise 由 db.modify_teammember.create 方法创建
          await db.modify_teammember.create(
            modifiedMemberData
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async modifyPwd(identity, old_pwd, new_pwd, user_id) {
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

      return 'Password changed successfully';
    } catch (error) {
      throw new Error('Failed to change password: ' + error.message);
    }
  }

  // 根据身份和用户ID从数据库中获取用户信息
  static async getUserByIdentityAndId(identity, userId) {
    if (identity == '1') { // 是队长
      return await db.teammember.findByPk(userId);
    } else if (identity == '2') {// 是队员
      return await db.teammember.findOne({
        where: { id: userId }
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
    } if (identity == '2') { // 是队员
      await db.teammember.update({ pwd: hash_pwd }, { where: { id: userId } });
    } else if (identity == '3') { //是指导老师
      await db.teacher.update({ pwd: hash_pwd }, { where: { id: userId } });
    }
  }

  static async getLeaderNameById(leaderId) {
    const leader = await db.teammember.findOne({
      where: {
        id: leaderId
      },
      attributes: ['name']
    });
    return leader.name;
  }

  static async getInstructorNameById(instructorId) {
    const instructor = await db.teacher.findOne({
      where: {
        id: instructorId
      },
      attributes: ['name']
    });
    return instructor.name;
  }

  static async getLeaderById(leaderId) {
    const leader = await db.teammember.findOne({
      where: {
        id: leaderId
      }
    });
    return leader;
  }

  static async getLeaderIdByTeamId(teamId) {
    const team = await db.team.findOne({ where: { id: teamId } });
    return team.leader_id;
  }

  static async getInstructorById(instructorId) {
    const instructor = await db.teacher.findOne({
      where: {
        id: instructorId
      },
    });
    return instructor;
  }

  static async getTeamActivityById(teamId, activityId) {
    const result = db.teamactivity.findOne({
      where: {
        team_id: teamId,
        activity_id: activityId
      }
    });
    return result;
  }
}

module.exports = teamService;