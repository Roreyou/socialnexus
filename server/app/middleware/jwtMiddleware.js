const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log("debug authHeader:",authHeader);
    /*if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token is missing or invalid' });
    }*/
    if (!authHeader) {
        return res.status(401).json({ message: 'Token is missing or invalid' });
    }
    //const token = authHeader.substring(7); // 去除 'Bearer '
    //console.log("debug token:",token);
    try {
        const decoded = jwt.verify(authHeader, jwtConfig.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;