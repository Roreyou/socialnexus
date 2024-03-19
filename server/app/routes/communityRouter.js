// routes/users.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');

// 我的活动
router.get('/activityInfo', ActivityController.getActivityById);//查询byID
router.post('/activityInfo',ActivityController.createActivity);//添加
router.put('/activityInfo',ActivityController.updateActivity);//修改
router.delete('/deleteActivity',ActivityController.deleteActivity);//删除
router.get('/activities',ActivityController.getActivityByCommu);//查询By社区和status
router.get('/queryActivity',ActivityController.queryActivity);//模糊查询活动byName

module.exports = router;