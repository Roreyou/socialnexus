const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schoolteam', {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    pwd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    team_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    school_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    setup_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'schoolteam',
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
