//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');
const ActivityController = require('../controllers/activityController.js');

const router = express.Router();

router.post('/authentification', TeamController.authentification);

router.get('/activsquare/filter', ActivityController.filterActivity);
router.get('/activsquare/search', ActivityController.searchActivities);
router.put('/favor', TeamController.favoriteActivity);

module.exports = router;
