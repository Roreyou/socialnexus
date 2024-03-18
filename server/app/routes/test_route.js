// routes/users.js

const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController.js');

// 处理 GET 请求的路由，显示所有用户
router.get('/', ActivityController.getAllActivities);

module.exports = router;