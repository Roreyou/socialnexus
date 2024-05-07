const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likereply', {
    reply_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    ifread: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'likereply',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reply_id" },
          { name: "team_id" },
        ]
      },
    ]
  });
};
