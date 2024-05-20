//routes/teamRouter.js

const express = require('express');
const ImageController = require('../controllers/imageController.js');

const router = express.Router();


router.put('/', ImageController.uploadImage);





module.exports = router;
