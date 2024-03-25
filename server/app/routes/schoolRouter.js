// routes/schoolRouter.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');
const CommunityController= require('../controllers/communityController.js');
const TeamController= require('../controllers/teamController.js');
const DatawallController= require('../controllers/datawallController.js');
const { Model } = require('sequelize');

//高校队伍
// router.get('/teamInfo', TeamController.getTeamById);//查询by活动ID
// router.get('/teams',TeamController.getTeamByCommu);//查询by社区和status
// router.get('/queryTeamByName',TeamController.queryTeamByName);//模糊查询队伍by队伍名
// router.get('/queryTeamByAct',TeamController.queryTeamByAct);//模糊查询队伍by活动名
// router.post('/admitTeam',TeamController.admitTeam);//录取或驳回队伍
// router.post('/commentTeam',TeamController.commentTeam);//评价队伍的成果

//数据墙
router.get('/datawall_act',DatawallController.getDatawallByActivity);//查询by活动


module.exports = router;
