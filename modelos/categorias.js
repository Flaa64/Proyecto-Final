const { DataTypes } = require('sequelize')
const sequelize = require("./../src/database/sequelize");

const Categorias = sequelize.define('categorias', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  categoria: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: ""
  }
}, {
  sequelize,
  tableName: 'categorias',
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

module.exports = Categorias