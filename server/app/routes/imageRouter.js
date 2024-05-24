//routes/teamRouter.js

const express = require('express');
const ImageController = require('../controllers/imageController.js');
const PostController = require('../controllers/postController.js');
const multer = require('multer');

// 使用内存临时存储传的图片
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//router.put('/', ImageController.uploadImage);
router.post('/', upload.single('image'), PostController.savePostImg);




module.exports = router;
