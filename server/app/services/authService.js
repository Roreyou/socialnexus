const bcrypt = require('bcrypt');
const db = require('../models/index');
const generateToken=require('../utils/jwtUtils');

class AuthService {
    static login = async (loginData) => {
        let model; // 声明 model 变量
        // 从数据库中获取用户信息
        if (loginData.identity === 'community') {
            model = db.community; // 不同的身份identity修改这里的model
        }

        const user = await model.findOne({
            where: {
              id: loginData.id // 匹配用户ID
            }
          });

        if (!user) {
            throw new Error('用户不存在');
        }

        // loginData.pwd是用户输入的密码，user.password是从数据库中获取的哈希密码
        const passwordMatch = await bcrypt.compare(loginData.pwd, user.pwd);


        if (!passwordMatch) {
            throw new Error('密码错误');
        }

        // 在这里可以生成 JWT 
        return generateToken(loginData);
    };

    static register = async (registerData) => {
        let model; // 声明 model 变量
    
        if (registerData.identity === 'community') {
            model = db.community; // 根据 identity 选择不同的 model
        }
    
        const user = { ...registerData };
        delete user.identity;
        
        // 加密密码
        user.pwd = await bcrypt.hash(user.pwd, 10);
        // console.log(user);
        
        try {
            // 注册成功
            if (model) {
                await model.create(user);
                return model;
            } else {
                throw new Error('数据不完整');
            }
        } catch (error) {
            if (error.code === '23505' || error.message.includes('already exists')) {
                throw new Error('账号已存在');//这里还没有实现
            } else {
                throw new Error(error.message);
            }
        }
    };
}

module.exports = AuthService;

