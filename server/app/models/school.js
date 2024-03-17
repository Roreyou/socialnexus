const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('school', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    pwd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    manager: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    setup_date: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'school',
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
