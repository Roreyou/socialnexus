// routes/users.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/activityController.js');

// 处理 GET 请求的路由，显示所有用户
router.get('/test', UserController.getAllUsers);

module.exports = router;