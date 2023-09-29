const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('titulos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'reparto',
        key: 'idTitulo'
      }
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
    tableName: 'titulos',
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
