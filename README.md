# Documentación de la API de TRAILERFLIX

## Introducción

La API de TRAILERFLIX proporciona acceso a información sobre categorías y un catálogo de películas y series. A continuación, se detallan los endpoints disponibles y cómo utilizarlos.

## Endpoints Disponibles

| Método   | Endpoint           | Descripción                       |
|----------|--------------------|-----------------------------------|
| GET      | `/`                | Mensaje de bienvenida             |
| GET      | `/categorias`      | Obtener todas las categorías      |
| GET      | `/categorias/:id`  | Obtener una categoría por ID      |
| GET      | `/catalogo`        | Obtener el catálogo de películas y series filtrado |

## Uso de los Endpoints

### 1. Mensaje de Bienvenida

- **Endpoint**: `/`
- **Descripción**: Este endpoint devuelve un mensaje de bienvenida.

#### Ejemplo de Uso

```javascript
GET / HTTP/1.1

{
  "message": "Bienvenido a la API de TRAILERFLIX"
}
```

### 2. Obtener Todas las Categorías
- **Endpoint**: `/categorias`
- **Descripción**: Este endpoint devuelve una lista de todas las categorías disponibles.

#### Ejemplo de Uso
```javascript
GET /categorias HTTP/1.1

{
    [
        {
            "id": 1,
            "nombre": "Película"
        },
        {
            "id": 2,
            "nombre": "Serie"
        }
        // ...
        ]
}
```

### 3. Obtener una Categoría por ID
- **Endpoint**: `/categorias/:id`
- **Descripción**: Este endpoint devuelve una categoría específica según su ID.

#### Ejemplo de Uso
```javascript
GET /categorias/1 HTTP/1.1

{
  "id": 1,
  "nombre": "Película"
}
```

### 4. Obtener el Catálogo de Películas y Series Filtrado
- **Endpoint**: `/catalogo`
- **Descripción**: Este endpoint devuelve el catálogo de películas y series con opciones de filtro.
#### Parámetros de Consulta
- **id (Opcional)**: ID de la película o serie.
- **nombre (Opcional)**: Título de la película o serie.
- **genero (Opcional)**: Género de la película o serie.
- **categoria (Opcional)**: Categoría de la película o serie.

#### Ejemplo de Uso
```javascript
GET /catalogo?genero=Acción&categoria=Película HTTP/1.1

[
  {
    "id": 1,
    "titulo": "Nombre de la Película",
    "genero": "Acción",
    "categoria": "Película"
  },
  {
    "id": 2,
    "titulo": "Otra Película",
    "genero": "Acción",
    "categoria": "Película"
  }
  // ...
]
```