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

// Ruta para obtener un producto por su id
app.get("/mobiliarios/:id", async (req, res) => {
  const mobiliarioId = parseInt(req.params.id) || 0;

  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de mobiliarios y convertir los documentos a un array
    const db = client.db("MobiliarioDB");
    const mobiliario = await db.collection("mobiliarios").findOne({ codigo: mobiliarioId });
    res.json(mobiliario);

  } catch (error) {
    // Manejo de errores al obtener los mobiliarios
    res.status(500).send("Error al obtener los mobiliarios de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();

  }
});

// Ruta para obtener un producto por parte de su nombre
app.get("/mobiliarios/by-name/:name", async (req, res) => {
  const regexp = new RegExp(req.params.name, "i");
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de mobiliarios y convertir los documentos a un array
    const db = client.db("MobiliarioDB");
    const mobiliarios = await db.collection("mobiliarios").find({ nombre: regexp }).toArray();
    res.json(mobiliarios);

  } catch (error) {
    // Manejo de errores al obtener los mobiliarios
    res.status(500).send("Error al obtener los mobiliarios de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();

  }
});

// Ruta para obtener todos los productos de una categoría específica 
app.get("/mobiliarios/by-category/:category", async (req, res) => {

  const regexp = new RegExp(req.params.category, "i")
  try {
    // Conexión a la base de datos
    const client = await connectToDB();
    if (!client) {
      res.status(500).send("Error al conectarse a MongoDB");
      return;
    }

    // Obtener la colección de mobiliarios y convertir los documentos a un array
    const db = client.db("MobiliarioDB");
    const mobiliario = await db.collection("mobiliarios").find({ categoria: regexp }).toArray();
    res.json(mobiliario);

  } catch (error) {
    // Manejo de errores al obtener los mobiliarios
    res.status(500).send("Error al obtener los mobiliarios de la base de datos");
  } finally {
    // Desconexión de la base de datos
    await disconnectFromMongoDB();

  }
});


// Ruta para crear un nuevo producto y guardar los cambios
app.post("/mobiliarios/:id", async (req, res) => {
  let nuevoMobiliario = req.body;
  const id = req.params.id
  if (nuevoMobiliario === undefined || id === undefined) {
    return res.status(400).send('Error en el formato de datos a crear');
  }
  const client = await connectToDB();
  if (!client) {
    return res.status(500).send('Error al conectarse a MongoDB');
  }
  nuevoMobiliario.codigo = id;
  const collection = client.db('MobiliarioDB').collection('mobiliarios');
  collection.insertOne(nuevoMobiliario)
    .then(() => {
      console.log('Nuevo mobiliario creado');
      res.status(201).send(nuevoMobiliario); // Enviar una respuesta exitosa
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      client.close();
    });
});

// Ruta para modificar el precio de un producto
app.put("/mobiliarios/:id", async (req, res) => {
  const id = req.params.id;
  const nuevoPrecio = {
    precio: req.body.precio
  };
  if (!nuevoPrecio) {
    return res.status(400).send('Error en el formato de datos recibidos');
  }

  const client = await connectToDB();
  if (!client) {
    return res.status(500).send('Error al conectarse a MongoDB');
  }
  const collection = client.db('MobiliarioDB').collection('mobiliarios');
  collection.updateOne({ codigo: parseInt(id) }, { $set: nuevoPrecio })
    .then(() => {
      console.log('Mobiliario modificado');
      res.status(201).send(nuevoPrecio); // Enviar una respuesta exitosa
    })
    .catch(error => {
      res.status(500).json({ descripcion: 'Error al modificar el precio' });
    })
    .finally(() => {
      client.close();
    });
});

// Ruta para eliminar un producto
app.delete("/mobiliarios/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send('Error en datos recibidos');
  }

  const client = await connectToDB();
  if (!client) {
    return res.status(500).send('Error al conectarse a MongoDB');
  }
  const collection = client.db('MobiliarioDB').collection('mobiliarios');
  collection.deleteOne({ codigo: parseInt(id) })
    .then((resultado) => {
      if (resultado.deletedCount === 0) {
        res.status(404).send('No se encontro mobiliario con el id proporcionado:', id);
      } else {
        console.log('Producto eliminado');
        res.status(201).send(); // Enviar una respuesta exitosa  
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ descripcion: 'Error al eliminar el producto' });
    })
    .finally(() => {
      client.close();
    });
});



// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe.");
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


