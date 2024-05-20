
const Result = require('../common/Result');
const imageService = require('../services/ImageService');

class ImageController {
  static async uploadImage(req, res) {
    try {
      const url = await imageService.upload(req.body.filename);
      console.log(url);
      return res.json(Result.success(url));
    } catch (error) {
      return res.json(Result.fail(error.message));
    }
  }
}

module.exports = ImageController;