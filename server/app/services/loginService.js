const bcrypt = require('bcrypt');
const db = require('../models/index');
const generateToken=require('../utils/jwtUtils');

const loginService = async (user_id, password) => {
    // 从数据库中获取用户信息
    model=db.community;//不同的身份修改这里的model
    const user = await model.findOne({id:user_id});

    if (!user) {
        throw new Error('用户不存在');
    }

    // 验证密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('密码错误');
    }

    // 在这里可以生成 JWT 
    return generateToken(user_id);
};

module.exports = loginService;