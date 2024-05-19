// routes/users.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');
const CommunityController= require('../controllers/communityController.js');
const TeamController= require('../controllers/teamController.js');

//我的
router.get('/myInfo', CommunityController.getCommunityById);//查询byID
router.put('/myInfo',CommunityController.updateCommunity);//修改社区信息

// 我的活动
router.get('/activityInfo', ActivityController.getActivityById);//查询byID
router.post('/activityInfo',ActivityController.createActivity);//添加
router.put('/activityInfo',ActivityController.updateActivity);//修改
router.delete('/deleteActivity',ActivityController.deleteActivity);//删除
router.get('/activities',ActivityController.getActivityByStatus);//查询By社区和status
router.get('/queryActivity',ActivityController.queryActivity);//模糊查询活动byName

//我的队伍
router.get('/teamInfo', TeamController.getTeamById);//查询by队伍ID
router.get('/teams',TeamController.getTeamByCommu);//查询by社区和status
router.get('/queryTeamByName',TeamController.queryTeamByName);//模糊查询队伍by队伍名
router.get('/queryTeamByAct',TeamController.queryTeamByAct);//模糊查询队伍by活动名
router.post('/admitTeam',TeamController.admitTeam);//录取或驳回队伍
router.post('/commentTeam',TeamController.commentTeam);//评价队伍的成果

//数据墙
// router.get('/datawall_com',DatawallController.getDatawallByCommunity);//查询by社区

module.exports = router;