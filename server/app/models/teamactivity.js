const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teamactivity', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    activity_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    team_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    com_to_team: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_to_acticity: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'teamactivity',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
