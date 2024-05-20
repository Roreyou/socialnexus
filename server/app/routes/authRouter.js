//routes/authRouter.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register/community', authController.register);
router.post('/register/schoolteam', authController.registerTeam);

router.post('/login', authController.login);
router.post('/login/schoolteam', authController.loginTeam);

module.exports = router;