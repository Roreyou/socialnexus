const { sequelize, activities } = require('../models');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await activities.findAll(); // 使用 Sequelize 查询所有用户数据
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // 其他方法...

};

module.exports = UserController;