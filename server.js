// Importar los paquetes y módulos necesarios
require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env
const express = require("express"); // Importar el framework Express
const app = express(); // Crear una aplicación Express

// Importar los módulos relacionados con la base de datos
const sequelize = require("./src/database/sequelize"); // Sequelize para la conexión a la base de datos
const Categorias = require('./modelos/categorias'); // Importar el modelo Categorias
const View = require('./modelos/view'); // Importar el modelo View

const Sequelize = require('sequelize'); // Importar la librería Sequelize
const Op = Sequelize.Op; // Operador de Sequelize para consultas

const { CATEGORIAS } = require('./consts') // Importar la constante CATEGORIAS

// Establecer el número de puerto del servidor (usar el de las variables de entorno o el predeterminado 3000)
const PORT = process.env.PORT || 3000;

// Configurar el middleware para analizar los cuerpos de las solicitudes como JSON
app.use(express.json());

// Middleware para establecer el tipo de contenido de la respuesta como JSON antes de cada solicitud
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next(); // Pasar al siguiente middleware o ruta
});

// Definir una ruta básica para la ruta raíz
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de TRAILERFLIX"); // Enviar un mensaje de bienvenida
});

// Ruta para obtener todas las categorías
app.get('/categorias', async (req, res) => {
  try {
    res.json(await Categorias.findAll()); // Devolver la lista de categorías en formato JSON
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' }); // Manejar errores
  }
});

// Ruta para obtener categorías por ID
app.get('/categorias/:id', async (req, res) => {
  try {
    res.json(await Categorias.findOne({ where: { id: req.params.id } })); // Devolver una categoría por ID en formato JSON
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' }); // Manejar errores
  }
});

// Ruta para obtener el catálogo
app.get('/catalogo', async (req, res) => {
  try {
    const { id, nombre, genero, categoria } = req.query;
    let where = {};
    if (id) where.id = id;
    if (nombre) where.titulo = nombre;
    if (genero) {
      where.generos = { [Op.like]: `%${genero}%` };
    }
    if (categoria) {
      if (validarCategoria(categoria)) {
        where.categoria = categoria;
      } else {
        return res.status(404).json({ error: `Categoría inexistente. Por favor usar una de las siguientes categorías válidas: ${CATEGORIAS}` });
      }
    }
    return res.json(await View.findAll({ where })); // Devolver el catálogo en formato JSON según los parámetros de consulta
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener catálogo' }); // Manejar errores
  }
});

// Función para validar una categoría
const validarCategoria = (categoria) => {
  return categoria && CATEGORIAS.includes(categoria);
};

// Ruta para manejar solicitudes a rutas no existentes
app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe."); // Enviar una respuesta 404 para rutas desconocidas
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`); // Registrar un mensaje que indique que el servidor está escuchando
});