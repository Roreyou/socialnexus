const jwt = require('jsonwebtoken');
const jwtConfig=require('../config/jwtConfig');

// 生成 JWT
const generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.jwtSecret, { expiresIn: '1h' });
};


module.exports = generateToken;