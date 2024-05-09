const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    team_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    num: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "team_id" },
          { name: "post_id" },
        ]
      },
    ]
  });
};
