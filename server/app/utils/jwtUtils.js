const jwt = require('jsonwebtoken');
const jwtConfig=require('../config/jwtConfig');

// 生成 JWT
const generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.jwtSecret, { expiresIn: '1h' });
};

// 验证 JWT 的辅助函数
const verifyToken = (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey);
    return decoded;
  } catch (err) {
    return res.status(500).json({ message: 'Failed to authenticate token' });
  }
};



module.exports = {generateToken,verifyToken};