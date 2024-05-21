//routes/teamRouter.js

const express = require('express');
const ImageController = require('../controllers/imageController.js');

const router = express.Router();


router.post('/', ImageController.uploadImage);





module.exports = router;
