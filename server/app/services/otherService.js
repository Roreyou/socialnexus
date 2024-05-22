// services/otherService.js
const db = require('../models/index');
const Op = require('sequelize');

class  otherService{
    static async getCurrentTime(){
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString();
        return formattedTime;
    }

    static async IdInt2String(IdName, event){
         // 检查事件对象是否存在
        if (!event) {
            return event;
        }
        // 遍历事件对象的每个属性
        for (const key in event) {
            // 如果属性名等于指定的 IdName，则将其值转换为字符串类型
            console.log("debug key:",key);
            if (key === IdName && typeof event[key] === 'number') {
                event[key] = event[key].toString();
                break;
            }        
        }
        console.log("debug 01:",IdName);
        console.log("debug 02", event);
        return event;
    }

    static async getOwnerTeamIdByPostId(post_id){
        // 根据 post_id 在 post 表中找到对应的 team_id
        const post = await db.post.findByPk(post_id);
        if (!post) {
            throw new Error('Post not found');
        }
        const ownerTeam_id = post.team_id;
        return ownerTeam_id;
    }

    // 更新通知
    static async updateNotification(post_id, ownerTeam_id, ifadd){
        // post_id：该帖子的id
        // ownerTeam_id:该帖子所属的队伍
        // ifadd：这条通知是要增加还是应该删除

        // 更新在notification表里面
        // 在 notification 表中找到对应的记录并将 num 字段加 1
        var notification = await db.notification.findOne({ where: { post_id:post_id, team_id:ownerTeam_id } });
        if (!notification) {
            // 创建新的通知记录
            notification = await db.notification.create({ post_id, team_id:ownerTeam_id, num: 0 });
        }       
        if(ifadd){
            // 更新 num 字段
            console.log("debug ifadd:",ifadd);
            notification.num += 1;
        }else{
            // 更新 num 字段
            console.log("debug ifadd01:",ifadd);
            notification.num -= 1;
        }

        await notification.save();
    }

      //获取ids->名称的映射
    static async getCategKeyCommuIdsMap(events) {
        // 对每个活动进行处理
        const results = await Promise.all(events.map(async activity => {
        // 获取活动对应的分类名称
        const category = await db.activity_type.findOne({
            where: {
            id: activity.category_id
            },
            attributes: ['type_name']
        });

        // 获取活动对应的关键词名称
        const keywords = await db.keywords.findAll({
            where: {
            id: { [Op.in]: activity.keywords_id.split(',') } // 根据逗号分隔的关键词 id 查询
            },
            attributes: ['key_name']
        });

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
        const pageSize = 1; // 假设每页有 10 条数据
    
        if (pageNumber == 0) {
          // 如果页数等于 0，则表示第一部分，返回第一部分的数据
          return list.slice(0, pageSize);
        } else if (pageNumber > 0) {
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
}

module.exports = otherService;