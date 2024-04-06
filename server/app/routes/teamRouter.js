//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');
const ActivityController = require('../controllers/activityController.js');

const router = express.Router();


router.get('/getRecommend', TeamController.getRecommend);
router.get('/activsquare/filter', ActivityController.filterActivity);
router.get('/activsquare/search', ActivityController.searchActivities);
// 获取已报名活动
router.get('/getmyactiv', TeamController.getMyActiv);
// 搜索已报名活动
router.get('/searchmyactiv', TeamController.searchMyActiv);

router.put('/favor', TeamController.favoriteActivity);

router.post('/activsquare/register_event', TeamController.registerEvent);
router.post('/authentification', TeamController.authentification);

// 取消报名活动
router.delete('/cancelRegisterEvent', TeamController.cancelRegisterEvent);




module.exports = router;
