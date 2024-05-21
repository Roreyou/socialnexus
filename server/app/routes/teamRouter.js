//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');
const ActivityController = require('../controllers/activityController.js');
const PostController = require('../controllers/postController.js');
const postController = require('../controllers/postController.js');
const multer = require('multer');
const router = express.Router();

// 使用内存临时存储传的图片

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getMyTeams', TeamController.getMyTeams);
router.get('/getRecommend', TeamController.getRecommend);
router.get('/activsquare/filter', ActivityController.filterActivity);
router.get('/activsquare/search', ActivityController.searchActivities);
router.get('/activsquare/register_details',ActivityController.getRegisterDetail);
router.get('/activsquare/posterinfo', ActivityController.getPosterInfo);
router.get('/getmyactiv', TeamController.getMyActiv);
router.get('/searchmyactiv', TeamController.searchMyActiv);
router.get('/team2activ', TeamController.getMyComments);
router.get('/team2activ_finished',TeamController.getMyCommentsFinished)
router.get('/team2activ_unfinished',TeamController.getMyCommentsUnfinished)
router.get('/commu2team', TeamController.getCommunityComments);
router.get('/getteamInfo', TeamController.getTeamInfo);
router.get('/getteamfavor', TeamController.getTeamFavorites);
router.get('/getactidetail',ActivityController.getactiDetail);
router.get('/pyq/getdetail', PostController.getPostDetails);
router.get('/pyq/hit', PostController.getHit);
router.get('/pyq/samearea', PostController.getSameAreaPosts);
router.get('/pyq/latest', PostController.getLatestPosts);
router.get('/pyq/getnotice', PostController.getnotice);
router.get('/pyq/noticenum', PostController.getNoticeNum);
router.get('/getisregister', TeamController.getIsRegister);

router.put('/favor', TeamController.favoriteActivity);

router.post('/activsquare/register_event', TeamController.registerEvent);
router.post('/authentification', TeamController.authentification);
router.post('/commentactivity', TeamController.commentActivity);
router.post('/pyq/createpost', PostController.createPost);
router.post('/pyq/comment', postController.commentOnPost)
router.post('/pyq/likePost', postController.likePost);
router.post('/pyq/likeCom', postController.likeCom);
router.post('/pyq/likereply', postController.likeReply);
router.post('/pyq/reply', postController.Reply);
router.post('/pyq/delcomment', postController.delcomment);
router.post('/pyq/createpost/uploadpics', upload.single('image'), postController.savePostImg);
router.post('/pyq/delnotice', postController.delNotice);
router.post('/modifyinfo', TeamController.modifyInfo);
router.post('/modifypwd', TeamController.modifyPwd);

router.delete('/cancelRegisterEvent', TeamController.cancelRegisterEvent);




module.exports = router;
