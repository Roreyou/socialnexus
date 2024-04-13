//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');
const ActivityController = require('../controllers/activityController.js');
const PostController = require('../controllers/postController.js');

const router = express.Router();


router.get('/getRecommend', TeamController.getRecommend);
router.get('/activsquare/filter', ActivityController.filterActivity);
router.get('/activsquare/search', ActivityController.searchActivities);
router.get('/getmyactiv', TeamController.getMyActiv);
router.get('/searchmyactiv', TeamController.searchMyActiv);
router.get('/team2activ', TeamController.getMyComments);
router.get('/commu2team', TeamController.getCommunityComments);
router.get('/getteamInfo', TeamController.getTeamInfo);
router.get('/getteamfavor', TeamController.getTeamFavorites);

router.put('/favor', TeamController.favoriteActivity);

router.post('/activsquare/register_event', TeamController.registerEvent);
router.post('/authentification', TeamController.authentification);
router.post('/commentactivity', TeamController.commentActivity);
router.post('/pyq/createpost', PostController.createPost);
router.get('/pyq/getdetail', PostController.getPostDetails);

router.delete('/cancelRegisterEvent', TeamController.cancelRegisterEvent);




module.exports = router;
