# Descripción de las Rutas de la Aplicación Petstore

Este documento proporciona una descripción detallada de los archivos de rutas en la aplicación Petstore. Cada archivo de rutas define los endpoints de la API y sus respectivas operaciones.

## Archivos de Rutas

### 1. `userRoutes.js`

Este archivo maneja las rutas relacionadas con la gestión de usuarios. Incluye operaciones como registro, inicio de sesión, obtención de perfil, actualización y eliminación de usuarios.

- **Rutas:**
  - `POST /api/users/login`: Autentica a un usuario y devuelve un token JWT.
  - `POST /api/users/register`: Registra un nuevo usuario.
  - `GET /api/users/profile`: Obtiene el perfil del usuario autenticado.
  - `PUT /api/users/update`: Actualiza los datos del usuario autenticado.
  - `DELETE /api/users/delete`: Elimina el usuario autenticado.

- **Middleware:**
  - `verifyToken`: Verifica el token JWT para rutas protegidas.

### 2. `reviewRoutes.js`

Este archivo maneja las rutas relacionadas con las reseñas de productos. Permite a los usuarios autenticados crear reseñas y obtener reseñas de productos específicos.

- **Rutas:**
  - `POST /api/reviews`: Crea una nueva reseña para un producto.
  - `GET /api/reviews/{productId}`: Obtiene todas las reseñas de un producto específico.

- **Middleware:**
  - `verifyToken`: Verifica el token JWT para rutas protegidas.

### 3. `productRoutes.js`

Este archivo maneja las rutas relacionadas con la gestión de productos en la tienda. Incluye operaciones para obtener, crear, actualizar y eliminar productos.

- **Rutas:**
  - `GET /api/products`: Obtiene una lista de todos los productos.
  - `GET /api/products/{id}`: Obtiene los detalles de un producto específico.
  - `POST /api/products`: Crea un nuevo producto (requiere autenticación y rol de admin).
  - `PUT /api/products/{id}`: Actualiza los detalles de un producto existente.
  - `DELETE /api/products/{id}`: Elimina un producto existente.

- **Middleware:**
  - `verifyToken`: Verifica el token JWT para rutas protegidas.

### 4. `orderRoutes.js`

Este archivo maneja las rutas relacionadas con la creación de pedidos. Permite a los usuarios autenticados crear nuevos pedidos.

- **Rutas:**
  - `POST /api/orders`: Crea un nuevo pedido.

- **Middleware:**
  - `verifyToken`: Verifica el token JWT para rutas protegidas.

### 5. `cartRoutes.js`

Este archivo maneja las rutas relacionadas con la gestión del carrito de compras. Permite a los usuarios autenticados añadir, ver y eliminar productos del carrito.

- **Rutas:**
  - `POST /api/cart/items`: Añade un producto al carrito.
  - `GET /api/cart`: Muestra los productos en el carrito.
  - `DELETE /api/cart/items/{itemId}`: Elimina un producto específico del carrito.

- **Middleware:**
  - `verifyToken`: Verifica el token JWT para rutas protegidas.

## Middleware

### `verifyToken`

Este middleware se utiliza para proteger rutas que requieren autenticación. Verifica la validez del token JWT proporcionado en las solicitudes.

## Documentación Swagger

Cada archivo de rutas incluye anotaciones Swagger para generar documentación de la API. Estas anotaciones describen los endpoints, parámetros, cuerpos de solicitud y respuestas esperadas.

Para acceder a la documentación Swagger, asegúrate de que tu aplicación esté configurada para servir la documentación generada por Swagger.
