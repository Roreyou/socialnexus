const bcrypt = require('bcrypt');
const db = require('../models/index');
const {generateToken:generateToken} = require('../utils/jwtUtils');
const short = require('short-uuid');
const imageService = require('./imageService');
const school = require('../models/school');

class AuthService {
    static login = async (loginData) => {
        let model; // 声明 model 变量
        // identity指名身份
        switch (loginData.identity) {
            case 'community':
                model = db.community;
                break;
            case 'school':
                model = db.school;
                break;
            case 'team':
                model = db.team;
                break;
        }
        // console.log(loginData)

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
        const token = generateToken(loginData);

        // 检查高校队伍的认证情况
        if (model === db.team) {
            const status = user.status; // 认证状态字段为 "status"
            return { token, status }; // 返回认证状态字段和生成的 JWT
        }

        return { "token": token };
    };

    static register = async (registerData) => {
        let model; // 声明 model 变量

        // identity指名身份，选择不同的table
        switch (registerData.identity) {
            case 'community':
                model = db.community;
                break;
            case 'school':
                model = db.school;
                break;
            case 'team':
                model = db.team;
                break;
            case 'member':
                model = db.teammember;
        }

        const user = { ...registerData };
        delete user.identity;

        // 加密密码
        user.pwd = await bcrypt.hash(user.pwd, 10);

        try {
            const existingUser = await model.findOne({ where: { id: user.id } });

            if (existingUser) {
                throw new Error("账号已存在");
            }

            // 注册成功
            if (model) {
                await model.create(user);
                return model;
            } else {
                throw new Error('数据不完整');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static async registerTeam(registerData) {
        const t = await db.sequelize.transaction();

        try {
            const team = { ...registerData };
            delete team.identity;

            // 创建 short-uuid 实例
            const uuid = short();

            // 自动生成id，生成短UUID
            const shortId = uuid.new();

            // 加密密码
            team.pwd = await bcrypt.hash(team.pwd, 10);
            team.id = shortId;
            team.verification_status = 1;

            const newTeam = { ...team };
            delete newTeam.pwd;

            const leader = await db.teammember.create({
                id: team.leader_id,
                team_id: team.id,
                pwd: team.pwd,
                school_id:"1",
                transaction: t,
            });

            const createdTeam = await db.team.create(newTeam, { transaction: t });

            await t.commit();

            return createdTeam;
        } catch (error) {
            if (t) {
                await t.rollback();
            }
            throw new Error(error.message);
        }
    }

    static loginTeam = async (loginData) => {
        const is_teacher = loginData.is_teacher;
        const team = await db.team.findOne({
            where: {
                id: loginData.team_id, // 匹配队伍ID
            }
        });
        let isleader = false;
        if (is_teacher == 0) {
            const user = await db.teammember.findOne({
                where: {
                    id: loginData.id, // 匹配用户ID
                    team_id: loginData.team_id, // 匹配队伍ID
                }
            });

            if (team.leader_id == loginData.id) {
                isleader = true;
            }

            if (!user) {
                throw new Error('用户不存在');
            }
            // loginData.pwd是用户输入的密码，user.password是从数据库中获取的哈希密码
            const passwordMatch = await bcrypt.compare(loginData.pwd, user.pwd);


            if (!passwordMatch) {
                throw new Error('密码错误');
            }

            // 在这里可以生成 JWT 
            const token = generateToken(loginData);

            //生成用户姓名
            const person = await db.teammember.findOne({where:{id:loginData.id}});
            var personName;
            if(person){
                if(!person.name){
                    personName = '';
                }else{
                    personName = person.name;
                }
            }else{
                throw new Error('用户不存在');                
            }
            
            
            return {                
                token: token,
                verification_status: team.verification_status,
                team_name: team.team_name,
                team_id: team.id,
                avatar: team.avatar,
                isleader: isleader,
                personName: personName,
                modification_status:team.modification_status
            };

        }
        else if (is_teacher == 1) {
            const user = await db.teacher.findOne({
                where: {
                    id: loginData.id, // 匹配用户ID
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
            const token = generateToken(loginData);


            return {
                token: token,
                verification_status: team.verification_status,
                team_name: team.team_name,
                team_id: team.id,
                avatar: team.avatar,
                isleader: isleader
            };
        }

    }


}


module.exports = AuthService;

