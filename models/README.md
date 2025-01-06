# Petstore Final Project

Este proyecto es una aplicación de tienda de mascotas que permite a los usuarios registrarse, iniciar sesión, agregar productos al carrito, realizar pedidos y dejar reseñas de productos.

## Modelos

### User
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

### Review
```javascript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
```

### Product
```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
```

### Order
```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    shippingAddress: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pendiente', 'en proceso', 'enviado', 'entregado'],
        default: 'pendiente',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
```

### Cart
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
```

## Ejecución con Docker

Para ejecutar esta aplicación con Docker, sigue los siguientes pasos:

1. Asegúrate de tener Docker instalado en tu máquina.
2. Crea un archivo `Dockerfile` en el directorio raíz del proyecto con el siguiente contenido:
    ```dockerfile
    FROM node:14
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD ["npm", "start"]
    ```
3. Crea un archivo `docker-compose.yml` en el directorio raíz del proyecto con el siguiente contenido:
    ```yaml
    version: '3'
    services:
      app:
        build: .
        ports:
          - "3000:3000"
        depends_on:
          - mongo
      mongo:
        image: mongo
        ports:
          - "27017:27017"
    ```
4. Construye y ejecuta los contenedores:
    ```sh
    docker-compose up --build
    ```

## Pruebas con Postman

Para probar las solicitudes en Postman, sigue los siguientes pasos:

1. Abre Postman y crea una nueva colección.
2. Agrega las siguientes solicitudes a la colección:

### Registro de usuario
- **Método:** POST
- **URL:** `http://localhost:3000/api/users/register`
- **Cuerpo (Body):**
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```

### Inicio de sesión de usuario
- **Método:** POST
- **URL:** `http://localhost:3000/api/users/login`
- **Cuerpo (Body):**
    ```json
    {
        "username": "testuser",
        "password": "password123"
    }
    ```

### Agregar producto al carrito
- **Método:** POST
- **URL:** `http://localhost:3000/api/cart`
- **Cuerpo (Body):**
    ```json
    {
        "userId": "user_id",
        "items": [
            {
                "productId": "product_id",
                "quantity": 1
            }
        ]
    }
    ```

### Realizar pedido
- **Método:** POST
- **URL:** `http://localhost:3000/api/orders`
- **Cuerpo (Body):**
    ```json
    {
        "userId": "user_id",
        "items": [
            {
                "productId": "product_id",
                "quantity": 1
            }
        ],
        "shippingAddress": "123 Main St",
        "paymentMethod": "credit card"
    }
    ```

### Dejar reseña de producto
- **Método:** POST
- **URL:** `http://localhost:3000/api/reviews`
- **Cuerpo (Body):**
    ```json
    {
        "productId": "product_id",
        "userId": "user_id",
        "rating": 5,
        "comment": "Great product!"
    }
    ```