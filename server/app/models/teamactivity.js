const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teamactivity', {
    activity_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      primaryKey: true
    },
    com_to_team: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_to_acticity: {
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
    }
  }, {
    sequelize,
    tableName: 'teamactivity',
    timestamps: false
  });
};
