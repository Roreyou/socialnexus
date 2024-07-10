const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorate', {
    team_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    activity_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'favorate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "team_id" },
          { name: "activity_id" },
        ]
      },
    ]
  });
};
