const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datawall_act', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    activity_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    team_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'datawall_act',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "activity_id" },
        ]
      },
    ]
  });
};
