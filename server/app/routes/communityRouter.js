// routes/users.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');

// 处理 GET 请求的路由
router.get('/activityInfo', ActivityController.getActivityById);

module.exports = router;