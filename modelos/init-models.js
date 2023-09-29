var DataTypes = require("sequelize").DataTypes;
var _actores = require("./actores");
var _categorias = require("./categorias");
var _genero_titulo = require("./genero_titulo");
var _generos = require("./generos");
var _reparto = require("./reparto");
var _titulos = require("./titulos");

function initModels(sequelize) {
  var actores = _actores(sequelize, DataTypes);
  var categorias = _categorias(sequelize, DataTypes);
  var genero_titulo = _genero_titulo(sequelize, DataTypes);
  var generos = _generos(sequelize, DataTypes);
  var reparto = _reparto(sequelize, DataTypes);
  var titulos = _titulos(sequelize, DataTypes);

  reparto.belongsTo(actores, { as: "idActor_actore", foreignKey: "idActor"});
  actores.hasMany(reparto, { as: "repartos", foreignKey: "idActor"});
  genero_titulo.belongsTo(generos, { as: "idGenero_genero", foreignKey: "idGenero"});
  generos.hasMany(genero_titulo, { as: "genero_titulos", foreignKey: "idGenero"});
  titulos.belongsTo(reparto, { as: "id_reparto", foreignKey: "id"});
  reparto.hasOne(titulos, { as: "titulo", foreignKey: "id"});

  return {
    actores,
    categorias,
    genero_titulo,
    generos,
    reparto,
    titulos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
