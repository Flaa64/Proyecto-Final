const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reparto', {
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
    idActor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: 'actores',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'reparto',
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
        name: "idActor",
        using: "BTREE",
        fields: [
          { name: "idActor" },
        ]
      },
    ]
  });
};
