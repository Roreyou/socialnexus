//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');
const ActivityController = require('../controllers/activityController.js');

const router = express.Router();

router.post('/authentification', TeamController.authentification);
console.log("Debug 01");

router.get('/activsquare/filter', ActivityController.filterActivity);
console.log("Debug 03");


module.exports = router;
