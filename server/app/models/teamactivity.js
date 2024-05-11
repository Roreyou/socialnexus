const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teamactivity', {
    activity_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    com_to_team: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_to_activity: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    admission_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    com_to_team_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    team_to_activity_time: {
      type: DataTypes.DATE,
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
          { name: "activity_id" },
          { name: "team_id" },
        ]
      },
    ]
  });
};
