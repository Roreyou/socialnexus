
const Result = require('../common/Result');
const imageService = require('../services/imageService');

class ImageController {
  static async uploadImage(req, res) {
    try {
      const url = await imageService.saveImg(req.body.image);
      console.log(url);
      return res.json(Result.success(url));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }
}

module.exports = ImageController;