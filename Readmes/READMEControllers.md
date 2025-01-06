# Controladores de la Aplicación Petstore

Este directorio contiene los controladores de la aplicación Petstore. Los controladores son responsables de manejar las solicitudes HTTP, interactuar con los modelos y devolver las respuestas adecuadas al cliente. A continuación, se describe el funcionamiento de cada archivo de controlador y la razón de su estructura.

## userController.js

Este archivo contiene las funciones relacionadas con la autenticación y gestión de usuarios.

- **login**: Esta función permite a los usuarios iniciar sesión. Verifica las credenciales proporcionadas y, si son correctas, genera un token JWT que se devuelve al cliente.
- **register**: Esta función permite registrar nuevos usuarios. Crea un nuevo usuario en la base de datos con una contraseña hasheada y devuelve un token JWT.
- **getProfile**: Esta función devuelve el perfil del usuario autenticado.
- **updateUser**: Esta función permite a los usuarios actualizar su información, como el nombre de usuario y la contraseña.
- **deleteUser**: Esta función permite a los usuarios eliminar su cuenta.

## reviewController.js

Este archivo contiene las funciones relacionadas con las reseñas de productos.

- **getReviewsByProduct**: Esta función obtiene todas las reseñas de un producto específico.
- **createReview**: Esta función permite a los usuarios crear una nueva reseña para un producto. Verifica que el producto exista y que el usuario no haya creado una reseña para el mismo producto anteriormente.

## productController.js

Este archivo contiene las funciones relacionadas con la gestión de productos.

- **getAllProducts**: Esta función obtiene todos los productos disponibles.
- **getProductById**: Esta función obtiene un producto específico por su ID.
- **createProduct**: Esta función permite a los administradores crear un nuevo producto.
- **updateProduct**: Esta función permite actualizar la información de un producto existente.
- **deleteProduct**: Esta función permite eliminar un producto.

## orderController.js

Este archivo contiene las funciones relacionadas con la gestión de pedidos.

- **createOrder**: Esta función permite a los usuarios crear un nuevo pedido. Utiliza el ID del usuario autenticado y guarda el pedido en la base de datos.

## cartController.js

Este archivo contiene las funciones relacionadas con la gestión del carrito de compras.

- **addItemToCart**: Esta función permite a los usuarios añadir productos a su carrito de compras.
- **getCart**: Esta función obtiene el carrito de compras del usuario autenticado.
- **removeItemFromCart**: Esta función permite a los usuarios eliminar productos de su carrito de compras.

## Estructura de los Controladores

La estructura de los controladores sigue el patrón MVC (Modelo-Vista-Controlador). Los controladores se encargan de recibir las solicitudes del cliente, interactuar con los modelos para obtener o modificar datos y devolver las respuestas adecuadas. Esta separación de responsabilidades facilita el mantenimiento y escalabilidad de la aplicación.

Cada controlador se enfoca en una entidad específica (usuarios, productos, reseñas, pedidos, carrito) y contiene funciones que manejan las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para esa entidad. Además, se utilizan middlewares como `verifyToken` para asegurar que solo los usuarios autenticados puedan realizar ciertas acciones.

Esta estructura modular y organizada permite un desarrollo más limpio y eficiente, facilitando la colaboración entre desarrolladores y la adición de nuevas funcionalidades en el futuro.
