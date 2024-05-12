const db = require('../models/index');
const cloud = require('wx-server-sdk')
const { Op } = require('sequelize');
const teamService = require('./teamService');
const activity = require('../models/activity');
const CommunityService = require('./communityService');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

class ActivityService {
  static async getAllActivities() {
    return await db.activity.findAll();
  }

  static async createActivity(activityData) {
    return await db.activity.create(activityData);
  }

  static async getActivityById(id) {
    return await db.activity.findByPk(id);
  }

  static async getActivityByCommu(commu_id, status) {
    let whereCondition = {};
    if (commu_id !== '0') {
      whereCondition.community_id = commu_id;
    }
    if (status !== '0') {
      whereCondition.status = status;
    }
    const activities = await db.activity.findAll({
      where: whereCondition
    });

    if (activities.length === 0) {
        return null;
    }

    return activities;
}

  static async updateActivity(id, activityData) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示活动不存在
    }
    await activity.update(activityData);
    return activity;
  }

  static async deleteActivity(id) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示活动不存在
    }
    await activity.destroy();
    return activity;
  }

  static async queryActivity(community_id, name) {
    let whereClause = {};
  
    // 添加活动名称的模糊查询条件
    whereClause.name = { [Op.like]: `%${name}%` };
  
    // 如果 community_id 不为 0，则添加 community_id 的查询条件
    if (community_id !== '0') {
      whereClause.community_id = community_id;
    }
  
    // 执行查询
    const activities = await db.activity.findAll({
      where: whereClause
    });

    if (activities.length === 0) {
      return null
    }
  
    return activities;
  }

  //审核社区活动
  static async approveActivity(id,approve) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示队伍不存在
    }
    await activity.update(
      {
        status: approve
      },
      { returning: true }
    );
    return activity;
  }

  static async queryActivity2(text, page) {
    const whereCondition = {
      [Op.and]: [
          {
              name: {
                  [Op.like]: `%${text}%`
              }
          },
          db.Sequelize.literal(`name NOT LIKE '%${text} %'`),
          db.Sequelize.literal(`name NOT LIKE '% ${text}%'`)
      ]
    };
    const activities = await db.activity.findAll({
      where: whereCondition
    });
    if (!activities) {
      return null; // 返回null表示活动不存在
    }
    const results = await ActivityService.getCategKeyCommuIdsMap(activities);
    const pageResults = await ActivityService.getPageData(page, results);
    return pageResults;
  }

  static async filterActivities(location, categoryId, activityTime) {
    let whereCondition = {};

    // 添加地区筛选条件
    if (location&& location.province) {
      if(location.city){
        whereCondition.city = location.city;
      }
      whereCondition.province = location.province;
    }

    // 添加类型筛选条件
    if (categoryId !== 0) {
      whereCondition.category_id = categoryId;
    }

    // 添加时间筛选条件
    if (activityTime) {
      whereCondition.start_time = { [db.Sequelize.Op.lte]: activityTime };
      whereCondition.end_time = { [db.Sequelize.Op.gte]: activityTime };
    }

    // 查询符合条件的活动
    const activities = await db.activity.findAll({ where: whereCondition });
    const results = await ActivityService.getCategKeyCommuIdsMap(activities);
    return results;
  }

  //
  // 定义一个函数来处理活动状态
  static async getActivityStatusMap(status) {
    //status为number类型
    switch(status) {
        case 1:
            return "待开展";
        case 2:
            return "开展中";
        case 3:
            return "已结束";
        default:
            return "未知状态";
    }
  }

  //获取ids->名称的映射
  static async getCategKeyCommuIdsMap(events){
    // 对每个活动进行处理
    const results = await Promise.all(events.map(async activity => {
      // 获取活动对应的分类名称
      const category = await db.activity_type.findOne({
        where: {
          id: activity.category_id
        },
        attributes:['type_name'] 
      });

      // 获取活动对应的关键词名称
      const keywords = await db.keywords.findAll({
        where: {
          id: { [Op.in]: activity.keywords_id.split(',') } // 根据逗号分隔的关键词 id 查询
        },
        attributes:['key_name']
      });
      console.log("debug:",keywords);

      // 获取活动对应的社区名字
      const community = await db.community.findOne({
        where: {
          id: activity.community_id
        },
        attributes: ['name']
      });

      const { ...rest } = activity.toJSON();
      // 构造处理后的活动信息
      return {
        ...rest,
        category_name: category ? category.type_name : null,
        keywords: keywords.map(keyword => keyword.key_name).join(','),
        community_name: community ? community.name : null
      };
    }));
    return results;
  }

  static async getPageData(pageNumber, list) {
    console.log("list:",list)
    const pageSize = 2; // 假设每页有 10 条数据

    if (pageNumber == 0) {
        // 如果页数等于 0，则表示第一部分，返回第一部分的数据
        console.log("list2:",list.slice(0, pageSize))
        return list.slice(0, pageSize);
    } else if(pageNumber > 0) {
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        if (startIndex >= list.length) {
            // 如果起始索引超出了数据范围，则返回空的 acti_list
            return [];
        } else {
            // 返回指定页数的数据
            return list.slice(startIndex, endIndex);
        }
    }
  }

  // 获取已报名活动列表的服务方法
  static async getMyActiv(team_id, activity_status, page) {
    try {
      // 在活动表中根据团队 ID 查找所有相关的活动 ID
      const activityIds = await db.teamactivity.findAll({
          where: {
            team_id: team_id
          }
      });
      
      // 将查询到的活动 ID 转换为数组
      const activityIdsArray = activityIds.map(activity => activity.activity_id);

      // 在团队活动表中根据活动 ID 和活动开展状态返回对应记录
      const myActivList = await db.activity.findAll({
          where: {
              id: activityIdsArray,
              activity_status: activity_status
          }
      });
  
      const handledActivityList = await this.getCategKeyCommuIdsMap(myActivList)
      handledActivityList.forEach(async activity => {
          // 获取活动状态
          const status = await this.getActivityStatusMap(activity.activity_status);
          // 添加 my_state 字段
          activity.my_state = status;
        });
      const pageActivityList = this.getPageData(page, handledActivityList);
      return pageActivityList;


    } catch (error) {
        throw error;
    }
  }

  // 搜索已报名活动列表的服务方法
  static async searchMyActiv(team_id, activity_name) {
    try {
      // 在活动表中根据团队 ID 查找所有相关的活动 ID
      const activityIds = await db.teamactivity.findAll({
          where: {
            team_id: team_id
          }
      });

      // 将查询到的活动 ID 转换为数组
      const activityIdsArray = activityIds.map(activity => activity.activity_id);

      // 假设根据搜索文本查询数据库中的活动信息
      const whereCondition = {
        [Op.and]: [
            {
                name: {
                    [Op.like]: `%${activity_name}%`
                }
            },
            db.Sequelize.literal(`name NOT LIKE '%${activity_name} %'`),
            db.Sequelize.literal(`name NOT LIKE '% ${activity_name}%'`),
            {
              id: activityIdsArray
            }
        ]
      };
      const activList = await db.activity.findAll({
        where: whereCondition
      });
      if (!activList) {
        return null; // 返回null表示活动不存在
      }else{
        const handledActivityList = await this.getCategKeyCommuIdsMap(activList)
        handledActivityList.forEach(async activity => {
            // 获取活动状态
            const status = await this.getActivityStatusMap(activity.activity_status);
            // 添加 my_state 字段
            activity.my_state = status;
          });
        return handledActivityList;
      }
 
    } catch (error) {
        throw error;
    }
  }

  // 取消报名活动的服务方法
  static async cancelRegisterEvent(team_id, activ_id) {
    try {
        // 在这里编写取消报名活动的逻辑
        // 假设删除指定队伍和活动的关联记录
        await db.teamactivity.destroy({
            where: {
                activity_id: activ_id,
                team_id: team_id                
            }
        });
    } catch (error) {
        throw error;
    }
  }

  //根据ID找活动
  static async FindActivity(activ_id){
    const ActInfo = await db.activity.findOne({ where: { id: activ_id } });
    if (!ActInfo) {
      return false;
    }
    else{
      return true;
    }
  }

  // 获取活动详情的方法
  static async getactidetail(id){
    const activity = await db.activity.findByPk(id);
    const community_id = activity.community_id;
    const activityArray = [activity];
    const handledActicityArray = await this.getCategKeyCommuIdsMap(activityArray);
    const handledActicity = handledActicityArray[0];
    //查找该活动对应的社区的联系电话
    const community = await db.community.findOne({
        where: {
            id: community_id
        }
    });
    
    if (community) {
        // 将 tel 添加到 handledActicity 对象中
        handledActicity.tel = community.tel;
    }else {
        // 没有找到对应的 community 记录
        console.log("Community not found");
        handledActicity.tel = "-1";
    }
    return {detail:handledActicity};
  }

  static async getActTime(activId){
    try {
      const activ = await db.activity.findOne({
          where: {
              id: activId
          },
          attributes:['start_time'] 
      });
      if (activ) {
          return activ;
      } else {
          throw new Error('Activity not found');
      }
    } catch (error) {
        console.error('Error getting activity time:', error);
    }
  }

  static async getActName(activId){
    const activity = await db.activity.findOne({
      where: {
          id: activId
      },
      attributes:['name'] 
    });
    return activity;
  }


  static async getRegisterDetail(teamId, activityId){
    const teamInfo = await teamService.getTeamById(teamId);
    const leader = await teamService.getLeaderById(teamInfo.leader_id);
    const instructor = await teamService.getInstructorById(teamInfo.instructor_id);
    const team_detail = {
      ...teamInfo.dataValues,
      leader_name: leader.name,
      instructor_name: instructor.name,
      instructor_tel: instructor.tel,
      leader_tel: leader.tel
    }

    const acti_detail = await ActivityService.getActivityById(activityId);
    return {team_detail, acti_detail};
  }

  static async getPosterInfo(activityId){
    const activity = await ActivityService.getActivityById(activityId);
    const name = activity.name;
    const begin_time = activity.start_time;
    const end_time = activity.end_time;
    const community_name = await CommunityService.getCommunityNameById(activity.community_id);
    const address =  `${activity.province}  ${activity.city} ${activity.address}`;
    const acti_picture = activity.picture;

    //获取二维码图片
    const code_picture = await ActivityService.getActivityQRCodePicture(activityId);
  }

  //获取二维码图片
  static async getActivityQRCodePicture(activityId){
    try {
      //http调用获取token
      const grant_type = 'client_credential';
      const appid = 'wx8fe05dd20b9f8b5d'; // 替换为你的小程序 AppID
      const secret = 'f794a13206475d25bb3f0fc2341f903b'; // 替换为你的小程序 AppSecret

      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`;

      const responseToken = await axios.get(url);


      // 第三方调用获取二维码
      // 构建请求参数
      const params = {
        access_token: responseToken.access_token,
        page: "page school/pages/details/details",
        scene: `acti_id=${activityId}`,
        check_path: true,
        env_version: "develop"
      };

      // 发送请求到微信接口获取小程序码
      const response = await cloud.openapi.wxacode.getUnlimited(params);

      // 
      console.log(response);
      console.log('Activity QR code saved successfully');
    
      return "成功了吗";
    } catch (error) {
        console.error('Error getting activity QR code:', error);
        throw new Error('Error getting activity QR code');
    }
  }

}

module.exports = ActivityService;