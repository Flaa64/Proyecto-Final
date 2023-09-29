// Cargar las variables de entorno del archivo .env
require("dotenv").config();

// Importar el módulo Express
const express = require("express");
const app = express();

const sequelize = require("./src/database/sequelize");
const Categorias = require('./modelos/categorias');
const View = require('./modelos/view');

// Configurar el número de puerto para el servidor
const PORT = process.env.PORT || 3000;

// Configurar el middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware para leer los datos antes de cada solicitud
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next(); // Pasar al siguiente middleware o ruta
});

app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de TRAILERFLIX");
});

// Ruta para obtener todas las categorías
app.get('/categorias', async (req, res) => {
  try {
    res.json(await Categorias.findAll()); // Devuelve la lista de categorías en formato JSON
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' }); // Manejo de errores
  }
});

// Ruta para obtener categorías por ID
app.get('/categorias/:id', async (req, res) => {
  try {
    res.json(await Categorias.findOne({ where: { id: req.params.id } })); // Devuelve la lista de categorías en formato JSON
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' }); // Manejo de errores
  }
});

//Ruta para obtener catalogo
app.get('/catalogo', async (req, res) => {
  try {
    res.json(await View.findAll()); // Devuelve la lista de categorías en formato JSON
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' }); // Manejo de errores
  }
});



// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe.");
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


