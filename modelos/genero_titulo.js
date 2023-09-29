const { DataTypes } = require('sequelize')
const sequelize = require("./../src/database/sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('genero_titulo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idTitulo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    idGenero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: 'generos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'genero_titulo',
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
      {
        name: "idTitulo",
        using: "BTREE",
        fields: [
          { name: "idTitulo" },
        ]
      },
      {
        name: "idGenero",
        using: "BTREE",
        fields: [
          { name: "idGenero" },
        ]
      },
    ]
  });
};
