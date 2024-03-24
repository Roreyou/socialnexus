const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datawall_com', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    community_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    activity_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    team_num: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'datawall_com',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "community_id" },
        ]
      },
    ]
  });
};
