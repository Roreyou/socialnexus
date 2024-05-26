//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');
const ActivityController = require('../controllers/activityController.js');
const PostController = require('../controllers/postController.js');
const postController = require('../controllers/postController.js');
const verifyToken = require('../middleware/jwtMiddleware'); // 导入 verifyToken 中间件
const router = express.Router();



/*//未验证
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
router.post('/pyq/delnotice', postController.delNotice);
router.post('/modifyinfo', TeamController.modifyInfo);
router.post('/modifypwd', TeamController.modifyPwd);

router.delete('/cancelRegisterEvent', TeamController.cancelRegisterEvent);
*/

//经过验证的路由
router.get('/getMyTeams', TeamController.getMyTeams);
router.get('/getRecommend', TeamController.getRecommend);
router.get('/activsquare/filter', ActivityController.filterActivity);
router.get('/activsquare/search', verifyToken, ActivityController.searchActivities); // 需要验证
router.get('/activsquare/register_details', verifyToken, ActivityController.getRegisterDetail); // 需要验证
router.get('/activsquare/posterinfo', verifyToken, ActivityController.getPosterInfo); // 需要验证
router.get('/getmyactiv', verifyToken, TeamController.getMyActiv); // 需要验证
router.get('/searchmyactiv', verifyToken, TeamController.searchMyActiv); // 需要验证
router.get('/team2activ', TeamController.getMyComments);
router.get('/team2activ_finished', verifyToken, TeamController.getMyCommentsFinished); // 需要验证
router.get('/team2activ_unfinished', verifyToken, TeamController.getMyCommentsUnfinished); // 需要验证
router.get('/commu2team', verifyToken, TeamController.getCommunityComments); // 需要验证
router.get('/getteamInfo', verifyToken, TeamController.getTeamInfo); // 需要验证
router.get('/getteamfavor', verifyToken, TeamController.getTeamFavorites); // 需要验证
router.get('/getactidetail', ActivityController.getactiDetail);
router.get('/pyq/getdetail', verifyToken, PostController.getPostDetails); // 需要验证
router.get('/pyq/hit', PostController.getHit);
router.get('/pyq/samearea', PostController.getSameAreaPosts);
router.get('/pyq/latest', PostController.getLatestPosts);
router.get('/pyq/getnotice', verifyToken, PostController.getnotice); // 需要验证
router.get('/pyq/noticenum', PostController.getNoticeNum);
router.get('/getisregister', verifyToken, TeamController.getIsRegister); // 需要验证

router.put('/favor', verifyToken, TeamController.favoriteActivity); // 需要验证

router.post('/activsquare/register_event', verifyToken, TeamController.registerEvent); // 需要验证
router.post('/authentification', TeamController.authentification);
router.post('/commentactivity', verifyToken, TeamController.commentActivity); // 需要验证
router.post('/pyq/createpost', verifyToken, PostController.createPost); // 需要验证
router.post('/pyq/comment', verifyToken, PostController.commentOnPost); // 需要验证
router.post('/pyq/likePost', verifyToken, PostController.likePost); // 需要验证
router.post('/pyq/likeCom', verifyToken, PostController.likeCom); // 需要验证
router.post('/pyq/likereply', verifyToken, PostController.likeReply); // 需要验证
router.post('/pyq/reply', verifyToken, PostController.Reply); // 需要验证
router.post('/pyq/delcomment', verifyToken, PostController.delcomment); // 需要验证
router.post('/pyq/delnotice', verifyToken, PostController.delNotice); // 需要验证
//router.post('/modifyinfo', verifyToken, TeamController.modifyInfo); // 需要验证
router.post('/modifyinfo', TeamController.modifyInfo);
router.post('/modifypwd', verifyToken, TeamController.modifyPwd); // 需要验证

router.delete('/cancelRegisterEvent', verifyToken, TeamController.cancelRegisterEvent); // 需要验证


module.exports = router;
