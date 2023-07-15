// Cargar las variables de entorno del archivo .env
require("dotenv").config();
const { connectToDB, disconnectFromMongoDB } = require("./src/database/mongodb");

// Importar el módulo Express
const express = require("express");
const app = express();

// Importar las funciones del gestor de mobiliarios
//const { leermobiliarios, guardarmobiliarios, eliminarFruta, actualizarFruta } = require("./src/mobiliariosManager");

// Configurar el número de puerto para el servidor
const PORT = process.env.PORT || 3000;

// Configurar el middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware para leer los datos de los mobiliarios antes de cada solicitud
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next(); // Pasar al siguiente middleware o ruta
});

// Ruta principal que devuelve los datos de los mobiliarios
app.get("/", (req, res) => {
  res.status(200).end("Bienvenido a la API de Mobiliario");
});

// Ruta para obtener todas los mobiliarios
app.get("/mobiliarios", async (req, res) => {
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de mobiliarios y convertir los documentos a un array
    const db = client.db("MobiliarioDB");
    const mobiliarios = await db.collection("mobiliarios").find().toArray();
    res.json(mobiliarios);
  } catch (error) {
    // Manejo de errores al obtener los mobiliarios
    res.status(500).send("Error al obtener los mobiliarios de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();
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
