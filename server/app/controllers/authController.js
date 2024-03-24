// 登录和注册功能的控制器

const AuthService = require('../services/authService');
const Result = require('../common/Result'); // 假设您的 Result 类定义在这个文件中

class AuthController {
    static login = async (req, res) => {
        try {
            const result = await AuthService.login(req.body);
            res.json(Result.success(result));
        } catch (error) {
            res.json(Result.fail(error.message));
        }
    };
    
    static register = async (req, res) => {
        const registerData = req.body;
    
        try {
            await AuthService.register(registerData);
            res.json(Result.success('注册成功'));
        } catch (error) {
            res.json(Result.fail(error.message));
        }
    
    }
}

module.exports = AuthController;
