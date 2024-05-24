const jwt = require('jsonwebtoken');
const Result = require('../common/Result');
const jwtConfig=require('../config/jwtConfig');

// 生成 JWT
const generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.jwtSecret, { expiresIn: '1h' });
};

// 验证 JWT 的辅助函数
// 验证 JWT 的中间件函数
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.json(Result.fail('No token provided'));
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtConfig.secretKey);
    //req.user = decoded; // 将解码后的信息添加到 req 对象上，以便在路由处理程序中使用
    next(); // 令牌验证成功，继续执行路由处理程序
  } catch (err) {
    // 错误处理，例如令牌无效或过期
    return res.json(Result.fail('Failed to authenticate token'));
  }
};



module.exports = {generateToken,verifyToken};