const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    my_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    post_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
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
