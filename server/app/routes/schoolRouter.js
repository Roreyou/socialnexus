// routes/schoolRouter.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');
const CommunityController= require('../controllers/communityController.js');
const TeamController= require('../controllers/teamController.js');
const DatawallController= require('../controllers/datawallController.js');

//高校队伍
// router.get('/teamInfo', TeamController.getTeamById);//查询by活动ID
// router.get('/teams',TeamController.getTeamByCommu);//查询by社区和status
// router.get('/queryTeamByName',TeamController.queryTeamByName);//模糊查询队伍by队伍名
// router.get('/queryTeamByAct',TeamController.queryTeamByAct);//模糊查询队伍by活动名
// router.post('/commentTeam',TeamController.commentTeam);//评价队伍的成果
router.put('/approveTeam',TeamController.approveTeam);//审核队伍

//活动
router.put('/approveActivity',ActivityController.approveActivity);//审核活动

//数据墙
router.get('/datawall_act',DatawallController.getDatawallByActivity);//活动数据
router.get('/datawall_com',DatawallController.getDatawallByCommunity);//社区数据


module.exports = router;
