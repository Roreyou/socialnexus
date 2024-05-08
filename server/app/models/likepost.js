const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likepost', {
    post_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    team_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    ifread: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    liketime: {
      type: DataTypes.DATE,
      allowNull: true
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
