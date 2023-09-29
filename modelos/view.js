const { DataTypes } = require('sequelize')
const sequelize = require("../src/database/sequelize");

const View = sequelize.define('new_view', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  poster: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ""
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ""
  },
  categoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1
  },
  resumen: {
    type: DataTypes.STRING(948),
    allowNull: true,
    defaultValue: ""
  },
  temporadas: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  trailer: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ""
  }
}, {
  sequelize,
  tableName: 'new_view',
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

module.exports = View