const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likecomment', {
    comment_id: {
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
    tableName: 'likecomment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
          { name: "team_id" },
        ]
      },
    ]
  });
};
