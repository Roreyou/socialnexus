const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likepost', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'likepost',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
          { name: "team_id" },
        ]
      },
    ]
  });
};
