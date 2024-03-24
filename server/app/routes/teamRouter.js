//routes/teamRouter.js

const express = require('express');
const TeamController = require('../controllers/teamController.js');

const router = express.Router();

router.post('/authentification', TeamController.authentification);

module.exports = router;
