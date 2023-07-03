const fs = require("fs");
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Función para guardar frutas en el archivo de base de datos
function guardarFrutas(frutas) {
  const datos = JSON.stringify(frutas); // Convertir el arreglo de frutas a formato JSON
  fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos); // Escribir los datos en el archivo definido en la variable de entorno DATABASE_PATH
}

// Función para leer frutas desde el archivo de base de datos
function leerFrutas() {
  const frutasString = fs.readFileSync(__dirname + process.env.DATABASE_PATH, "utf8"); // Leer los datos del archivo definido en la variable de entorno DATABASE_PATH como una cadena de texto
  const frutas = JSON.parse(frutasString); // Convertir la cadena de texto JSON a un arreglo de frutas
  return frutas; // Devolver el arreglo de frutas
}

const eliminarFruta = (idFruta, frutas) => {
  const index = frutas.findIndex(fruta => fruta.id == idFruta);
  if (index !== -1)
    res.send("Id inexistente");
  BD.splice(index, 1);
  guardarFrutas(frutas);
  return frutas;
}

const actualizarFruta = (id, frutaActualizada, frutas) => {
  let fruta = frutas.find( fruta => fruta.id == id);
  if (!fruta)
    res.send("Id inexistente");
  fruta = frutaActualizada;
  guardarFrutas(frutas);
  return fruta;
}

// Exportar las funciones para ser utilizadas por otros módulos
module.exports = {
  leerFrutas,
  guardarFrutas,
  eliminarFruta,
  actualizarFruta
};
