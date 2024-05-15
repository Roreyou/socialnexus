// services/otherService.js
const db = require('../models/index');

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
}

module.exports = otherService;