// routes/schoolRouter.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');
const TeamController= require('../controllers/teamController.js');
const DatawallController= require('../controllers/datawallController.js');

// 社区需求-活动
router.get('/activityInfo', ActivityController.getActivityById);//查询byID
router.get('/activities',ActivityController.getActivityByCommu);//查询By社区和status
router.get('/queryActivity',ActivityController.queryActivity);//模糊查询活动byName
router.put('/approveActivity',ActivityController.approveActivity);//审核活动

//高校队伍
router.get('/teamInfo', TeamController.getTeamById);//查询by队伍ID
router.get('/teams',TeamController.getTeamByStatus);//查询by status（这里的状态是审核的状态
router.get('/queryTeamByName',TeamController.queryTeamByName);//模糊查询队伍by队伍名
router.get('/queryTeamByAct',TeamController.queryTeamByAct);//模糊查询队伍by活动名
router.put('/approveTeam',TeamController.approveTeam);//审核队伍

//数据墙
router.get('/datawall_act',DatawallController.getActivityTypeCounts);//活动数据
router.get('/datawall_team',DatawallController.getMajorTypeCounts);//学院据



module.exports = router;
