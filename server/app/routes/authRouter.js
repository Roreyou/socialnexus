//routes/authRouter.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register/community', authController.register);

router.post('/login', authController.login);

module.exports = router;