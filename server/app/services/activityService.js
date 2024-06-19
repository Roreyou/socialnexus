const db = require('../models/index');
const axios = require('axios');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const fs = require('fs/promises');
const path = require('path');
const otherService = require('./otherService');
const teamService = require('./teamService');
const CommunityService = require('./communityService');
const imageService = require('./imageService');
const short = require('short-uuid');

class ActivityService {
  static async getAllActivities() {
    return await db.activity.findAll();
  }
  static async getKeywords() {
    const keywords = await db.keywords.findAll({
      attributes: ['key_name']
    });
    
    // 提取关键字名称并存入新数组
    const keywordNames = keywords.map(keyword => keyword.key_name);
    
    return keywordNames;
  }

  static async createActivity(activityData) {
    console.log(activityData)
    activityData.verification_status = 1
    activityData.activity_status = 1
    // 生成当前日期
    const currentDate = new Date();

    // 获取年月日部分
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 加1是因为月份是从0开始计数的，padStart用于补齐位数
    const day = String(currentDate.getDate()).padStart(2, '0');
    // 构建字符串
    const formattedDate = `${year}-${month}-${day}`;
    activityData.setup_date = formattedDate

    // 创建 short-uuid 实例
    const uuid = short();

    // 自动生成id，生成短UUID
    const shortId = uuid.new();

    activityData.id = shortId;
    // 切分关键词
    const keywords = (activityData.keywords || '').split(',');
    // 查询关键词并映射为关键词id
    const keywords_id = await Promise.all(keywords.map(async keyword => {
      const data = await db.keywords.findOne({ where: { key_name: keyword } });
      return data ? data.id : null; // 如果找到了对应的关键词，则返回关键词的id；否则返回null
    }));
    activityData.keywords_id = keywords_id.join(','); // 将关键词id连接为字符串
    return await db.activity.create(activityData);
  }

  static async getActivityById(id) {
    // 建立关联关系
    db.activity.belongsTo(db.activity_type, { foreignKey: 'category_id' });
    db.activity.belongsTo(db.community, { foreignKey: 'community_id' });
    // 查询活动
    const activity = await db.activity.findOne({
      where: { id },
      include: [
        { model: db.activity_type, attributes: [['type_name', 'category_name']] }, // 返回活动类型名
        { model: db.community, attributes: [['tel', 'tel'], ['name', 'community_name']] } // 返回电话号码和社区名称
      ],
      raw: true
    });

    // 切分关键词
    const keywordsIds = (activity.keywords_id || '').split(',');
    // 查询关键词并映射为关键词名称
    const keywords = await Promise.all(keywordsIds.map(async id => {
      const keyword = await db.keywords.findOne({ where: { id } });
      return keyword ? keyword.key_name : ''; // 如果找到了对应的关键词，则返回关键词；否则返回空字符串
    }));



    const formattedInfo = {
      ...activity,
      category_name: activity["activity_type.category_name"],
      community_name: activity["community.community_name"],
      tel: activity["community.tel"],
      keywords: keywords.join(','), // 将关键词连接为字符串


      'activity_type.category_name': undefined,
      'community.community_name': undefined,
      'community.tel': undefined,
      'keywords_id': undefined,
      'category_id': undefined,
    };
    return formattedInfo;

  }

  static async getActivityInfoById(activityId) {
    const activity = await db.activity.findOne({
      where: {
        id: activityId
      },
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
      }
    });

    return activity;
  }

  static async getActivityByCommu(commu_id, status) {
    // 这里的status是审核状态
    let activitiesToReturn;
    let whereCondition = {};

    // 根据不同的 status 设置不同的查询条件
    if (status == 0) {

    }
    else if (status == 1) {
      whereCondition = {
        verification_status: {
          [Op.or]: [2, 3]
        }
      };
    } else if (status == 2) {
      whereCondition = {
        verification_status: 1
      };
    }

    if (commu_id != '0') {
      whereCondition.community_id = commu_id
    }

    // console.log(whereCondition);

    // 建立关联关系
    db.activity.belongsTo(db.community, { foreignKey: 'community_id' });
    db.activity.belongsTo(db.activity_type, { foreignKey: 'category_id' });

    // 查询活动
    const activities = await db.activity.findAll({
      where: whereCondition,
      include: [
        { model: db.community, attributes: [['tel', 'tel'], ['name', 'community_name']] },
        { model: db.activity_type, attributes: [['type_name', 'category_name']] }

      ],
      raw: true
    });

    // 处理活动关键词
    activitiesToReturn = await Promise.all(activities.map(async activity => {

      // 切分关键词
      const keywordsIds = (activity.keywords_id || '').split(',');
      // 查询关键词并映射为关键词名称
      const keywords = await Promise.all(keywordsIds.map(async id => {
        const keyword = await db.keywords.findOne({ where: { id } });
        return keyword ? keyword.key_name : ''; // 如果找到了对应的关键词，则返回关键词；否则返回空字符串
      }));
      // 返回活动及关联信息
      return {
        ...activity,
        veri_status: activity.verification_status == 1 ? '未审核' : '已审核',
        community_name: activity["community.community_name"],
        category_name: activity["activity_type.category_name"],
        tel: activity["community.tel"],
        keywords: keywords.join(','), // 将关键词连接为字符串
        'community.community_name': undefined,
        'activity_type.category_name': undefined,
        'community.tel': undefined,
      };
    }));
    return activitiesToReturn;
  }

  static async getActivityByStatus(commu_id, status) {
    // 这里的status是开展
    let activitiesToReturn;
    let whereCondition = {};

    console.log(status);
    // 根据不同的 status 设置不同的查询条件
    if (status != 0) {
      whereCondition = {
        activity_status: status
      };
    }

    if (commu_id != '0') {
      whereCondition.community_id = commu_id
    }

    // 建立关联关系
    db.activity.belongsTo(db.community, { foreignKey: 'community_id' });
    db.activity.belongsTo(db.activity_type, { foreignKey: 'category_id' });
    // 查询活动
    const activities = await db.activity.findAll({
      where: whereCondition,
      include: [
        { model: db.community, attributes: [['tel', 'tel'], ['name', 'community_name']] },
        { model: db.activity_type, attributes: [['type_name', 'category_name']] }


      ],
      raw: true
    });

    // 处理活动关键词
    activitiesToReturn = await Promise.all(activities.map(async activity => {

      // 切分关键词
      const keywordsIds = (activity.keywords_id || '').split(',');
      // 查询关键词并映射为关键词名称
      const keywords = await Promise.all(keywordsIds.map(async id => {
        const keyword = await db.keywords.findOne({ where: { id } });
        return keyword ? keyword.key_name : ''; // 如果找到了对应的关键词，则返回关键词；否则返回空字符串
      }));
      // 返回活动及关联信息
      return {
        ...activity,
        veri_status: activity.verification_status == 1 ? '未审核' : '已审核',
        community_name: activity["community.community_name"],
        category_name: activity["activity_type.category_name"],
        tel: activity["community.tel"],
        keywords: keywords.join(','), // 将关键词连接为字符串
        'community.community_name': undefined,
        'activity_type.category_name': undefined,
        'community.tel': undefined,
      };
    }));
    return activitiesToReturn;
  }

  static async updateActivity(id, activityData) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示活动不存在
    }
    // 切分关键词
    const keywords = (activityData.keywords || '').split(',');
    // 查询关键词并映射为关键词id
    const keywords_id = await Promise.all(keywords.map(async keyword => {
      const data = await db.keywords.findOne({ where: { key_name: keyword } });
      return data ? data.id : null; // 如果找到了对应的关键词，则返回关键词的id；否则返回null
    }));
    activityData.keywords_id = keywords_id.join(','); // 将关键词id连接为字符串
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
    const activities_by_commu = await this.getActivityByCommu(community_id, 0);
    if (!activities_by_commu)
      return null;

    // 继续模糊查询 by_teamName
    const fuzzyActName = name;
    const activitiesFiltered = activities_by_commu
      .filter(activity => activity.name.includes(fuzzyActName))
      .map(({ tel, ...rest }) => rest); // 去除 tel 字段

    if (activitiesFiltered.length === 0)
      return null;

    return activitiesFiltered;
  }

  //审核社区活动
  static async approveActivity(id, approve) {
    const activity = await db.activity.findByPk(id);
    if (!activity) {
      return null; // 返回null表示不存在
    }
    await db.activity.update({ verification_status: approve + 1 }, { where: { id: id } });
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
      where: whereCondition,
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
    if (!activities) {
      return null; // 返回null表示活动不存在
    }

    const handledActivityList = await Promise.all(activities.map(async activity => {
      // 获取活动状态
      const status = await this.getActivityStatusMap(activity.activity_status);
      // 添加 my_state 字段
      activity.my_state = status;
      activity = await otherService.IdInt2String("id", activity);
      activity = await otherService.IdInt2String("category_id", activity);

      return activity;
    }));
    console.log(handledActivityList);

    const results = await otherService.getCategKeyCommuIdsMap(handledActivityList);
    const pageResults = await otherService.getPageData(page, results);


    return pageResults;
  }

  static async filterActivities(location, categoryName, activityTime) {
    console.log(typeof location)
    console.log(typeof activityTime)
    location = JSON.parse(location);

    const activity_time = activityTime;
    let whereCondition = {};
    if(categoryName != ""){
      var categoryId = 1;
      switch (categoryName) {
        case '社区经济发展':
          categoryId = 1;break;
        case '社区团建工作':
          categoryId = 2;break;
        case '社区社会调查':
          categoryId = 3;break;
        case '社区文体活动':
          categoryId = 4;break;
        case '社区教育服务':
          categoryId = 5;break;
        case '社区环境治理':
          categoryId = 6;break;
        default:
          categoryId = 7;
      }
        // 添加类型筛选条件
      if (categoryId !== 0) {
        whereCondition.category_id = categoryId;
      }
    }

    // 添加地区筛选条件
    if (location && location.province) {
      if (location.city != '') {
        whereCondition.city = location.city;
      }
      whereCondition.province = location.province;
    }

    // 添加时间筛选条件
    if (activity_time != "") {
      const isoDateString = activity_time.replace(' ', 'T') + 'Z'; // 转换为 ISO 8601 格式
      const dateObject = new Date(isoDateString);
      //const dateObject = new Date(activity_time);
      whereCondition.start_time = { [db.Sequelize.Op.lte]: dateObject };
      whereCondition.end_time = { [db.Sequelize.Op.gte]: dateObject };
    }

    console.log(whereCondition);
    // 查询符合条件的活动
    const activities = await db.activity.findAll({
      where: whereCondition,
      attributes: {
        include: [
          [
            //引用原生mySQL语法，将类型转化
            sequelize.literal("cast(id as char)"),
            'id'
          ],
          [sequelize.literal("cast(category_id as char)"), 'category_id'],
        ]
      }
    });
    const results = await otherService.getCategKeyCommuIdsMap(activities);
    console.log(results);
    return results;
  }

  //
  // 定义一个函数来处理活动状态
  static async getActivityStatusMap(status) {
    //status为number类型
    switch (status) {
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

  // 获取已报名活动列表的服务方法
  static async getMyActiv(team_id, activity_status, page) {
    try {
      // 在活动表中根据团队 ID 查找所有相关的活动 ID
      const activityIds = await db.teamactivity.findAll({
        where: {
          team_id: team_id
        }
      });
      console.log("debug:", activityIds);
      // 将查询到的活动 ID 转换为数组
      const activityIdsArray = activityIds.map(activity => activity.activity_id);
      console.log("debug:", activityIdsArray);
      var whereCondition = {
        id: activityIdsArray,
        activity_status: activity_status
      };
      if (activity_status == 0) {
        whereCondition = { id: activityIdsArray };
      }
      // 在团队活动表中根据活动 ID 和活动开展状态返回对应记录
      const myActivList = await db.activity.findAll({
        where: whereCondition
      });
      console.log("debug:", myActivList);
      const handledActivityList = await otherService.getCategKeyCommuIdsMap(myActivList)

      const ResultActivityList = await Promise.all(handledActivityList.map(async activity => {
        // 获取活动状态
        const status = await this.getActivityStatusMap(activity.activity_status);
        // 添加 my_state 字段
        activity.my_state = status;
        activity = await otherService.IdInt2String("id", activity);
        //activity = await otherService.IdInt2String("category_id", activity);

        const teamact = await db.teamactivity.findOne({ where: { activity_id: activity.id, team_id: team_id } });
        const actiStatus = teamact.admission_status;
        if (actiStatus == 1) {
          activity.admission_status = "待录取";
        } else if (actiStatus == 2) {
          activity.admission_status = "已录取";
        } else if (actiStatus == 3) {
          activity.admission_status = "已驳回";
        }
        /*// 调用服务来改变时间格式
        const newStartTimeFormat =await  otherService.changeTimeFormat(activity.start_time);
        const newEndTimeFormat =await  otherService.changeTimeFormat(activity.end_time);
        activity.start_time = newStartTimeFormat;
        activity.end_time = newEndTimeFormat;*/


        return activity;
      }));
      const pageActivityList = await otherService.getPageData(page, ResultActivityList);
      return { myactiv_list: pageActivityList };


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
      } else {
        var mapedActivityList = await otherService.getCategKeyCommuIdsMap(activList);
        const handledActivityList = await Promise.all(mapedActivityList.map(async activity => {
          // 获取活动状态
          const status = await this.getActivityStatusMap(activity.activity_status);
          // 添加 my_state 字段
          activity.my_state = status;
          activity = await otherService.IdInt2String("id", activity);
          activity = await otherService.IdInt2String("category_id", activity);


          const teamact = await db.teamactivity.findOne({ where: { activity_id: activity.id, team_id: team_id } });
          const actiStatus = teamact.admission_status;
          if (actiStatus == 1) {
            activity.admission_status = "待录取";
          } else if (actiStatus == 2) {
            activity.admission_status = "已录取";
          } else if (actiStatus == 3) {
            activity.admission_status = "已驳回";
          }
          return activity;
        }));
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
  static async FindActivity(activ_id) {
    const ActInfo = await db.activity.findOne({ where: { id: activ_id } });
    if (!ActInfo) {
      return false;
    }
    else {
      return true;
    }
  }

  // 获取活动详情的方法
  static async getactidetail(id, team_id) {
    const activity = await db.activity.findByPk(id);
    const community_id = activity.community_id;
    const activityArray = [activity];
    const handledActicityArray = await otherService.getCategKeyCommuIdsMap(activityArray);
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
    } else {
      // 没有找到对应的 community 记录
      console.error("Community not found");
      handledActicity.tel = "-1";
    }
    var result = await otherService.IdInt2String("id", handledActicity);
    result = await otherService.IdInt2String("category_id", result);
    //是否被收藏
    const favor = await db.favorate.findOne({ where: { team_id: team_id, activity_id: id } });
    var isfavor = true;
    if (!favor) {
      isfavor = false;
    }
    handledActicity.isfavor = isfavor;
    return { detail: handledActicity };
  }

  static async getActTime(activId) {
    try {
      const activ = await db.activity.findOne({
        where: {
          id: activId
        },
        attributes: ['start_time']
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

  static async getActName(activId) {
    const activity = await db.activity.findOne({
      where: {
        id: activId
      },
      attributes: ['name']
    });
    return activity;
  }


  static async getRegisterDetail(teamId, activityId) {
    const teamInfo = await db.team.findOne({ where: { id: teamId } });
    const leader = await teamService.getLeaderById(teamInfo.leader_id);
    const instructor = await teamService.getInstructorById(teamInfo.instructor_id);
    const team_detail = {
      ...teamInfo.dataValues,
      leader_name: leader.name,
      instructor_name: instructor.name,
      instructor_tel: instructor.tel,
      leader_tel: leader.tel
    }

    const acti_detail = await ActivityService.getActivityInfoById(activityId);
    // 调用服务来改变时间格式
    const newStartTimeFormat = await otherService.changeTimeFormat(acti_detail.start_time);
    const newEndTimeFormat = await otherService.changeTimeFormat(acti_detail.end_time);
    acti_detail.dataValues.start_time = newStartTimeFormat;
    acti_detail.dataValues.end_time = newEndTimeFormat;

    return { team_detail, acti_detail };
  }

  // 获取上两个文件夹名字
  static async getLastTwoFolderPath() {
    // 获取当前文件所在的目录
    const currentDir = __dirname;

    // 获取上两一个文件夹的路径
    const parentDir = path.dirname(currentDir);
    const pParentDir = path.dirname(parentDir);

    return pParentDir;
  }

  //保存QRCode的图片
  static async saveQRCodeImg(code_picture, folderName, QRCodeName) {
    // code_picture是二进制流
    try {
      const targetPath = await ActivityService.getLastTwoFolderPath();
      const imagePath = path.join(targetPath, folderName, QRCodeName);
      const imageUrl = `/${folderName}/${QRCodeName}`;

      // 将上传的图片保存到本地文件系统
      await fs.writeFile(imagePath, code_picture, 'binary', (err) => {
        if (err) {
          console.error('Error saving image:', err);
          return;
        }
        console.log('Image saved successfully as image.jpg');
      });

      return imageUrl;
    } catch (error) {
      throw error;
    }

  }

  static async getPosterInfo(activityId) {
    const activity = await ActivityService.getActivityById(activityId);
    const name = activity.name;
    const begin_time = await otherService.changeTimeFormat(activity.start_time);
    const end_time = await otherService.changeTimeFormat(activity.end_time);
    const community_name = await CommunityService.getCommunityNameById(activity.community_id);
    const address = `${activity.province} ${activity.city} ${activity.address}`;
    const acti_picture = activity.picture;

    var url;
    //如果数据库里还没有二维码
    if (activity.QRCode == null) {
      //获取二维码图片的二进制数据
      const code_picture = await ActivityService.getActivityQRCodePicture(activityId);
      // 将二进制数据写入文件查看
      // const codeUrl = await ActivityService.saveQRCodeImg(code_picture, "QRCodes", `QRCode_${activityId}.jpg`);
      try {
        //获取putsignedurl
        const filename = await otherService.generateRandomFileName('jpg');
        const { key, putSignedUrl: putSignedUrl, getUrl: getUrl } = await imageService.upload(filename);

        const response = await fetch(putSignedUrl, {
          method: 'PUT',
          body: code_picture
        });

        if (response.ok) {
          console.log('File uploaded successfully!');
        } else {
          console.error('Failed to upload file:', response.statusText);
        }

        url = getUrl;

      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
      console.log("debug url:", url);
      await db.activity.update(
        { QRCode: url }, // 更新的字段和值
        { where: { id: activityId } } // 指定更新条件
      )
    } else {
      url = activity.QRCode;
    }

    return {
      name: name,
      begin_time: begin_time,
      end_time: end_time,
      community_name: community_name,
      address: address,
      code_picture: url,
      acti_picture: acti_picture
    };
  }

  //获取二维码图片
  static async getActivityQRCodePicture(activityId) {
    try {
      //http调用获取token
      const grant_type = 'client_credential';
      const appid = 'wx8fe05dd20b9f8b5d'; // 替换为你的小程序 AppID
      const secret = 'f794a13206475d25bb3f0fc2341f903b'; // 替换为你的小程序 AppSecret

      const getTokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`;

      const responseToken = await axios.get(getTokenUrl);
      const access_token = responseToken.data.access_token;

      // http调用获取程序码
      const getQRCodeUrl = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`;
      const params = {
        //page: "pages/login/login",
        scene: `acti_id=${activityId}`,
        check_path: true,
        env_version: "develop"
      };

      // 发送 HTTPS 请求
      const responseCode = await axios.post(getQRCodeUrl, params, {
        responseType: 'arraybuffer' // 设置响应类型为二进制数组
      });

      /*
      // 假设 bufferData 是你要保存的 Buffer 对象
      const bufferData = Buffer.from(responseCode.data);

      // 指定要保存的文件路径
      const filePath = './outputBufferData.txt';

      // 异步写入文件
      await fs.writeFile(filePath, bufferData, (err) => {
        if (err) throw err;
        console.log('文件已保存');
      });*/

      return responseCode.data;

    } catch (error) {
      console.error('Error getting activity QR code:', error);
      throw new Error('Error getting activity QR code');
    }
  }

}

module.exports = ActivityService;