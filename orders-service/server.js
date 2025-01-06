const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Petstore API',
      version: '1.0.0',
      description: 'API for managing petstore',
    },
    host: 'localhost:3000', // Cambia esto si es necesario
    basePath: '/',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT token',
      },
    },
  },
  apis: ['./routes/*.js'], // Ruta donde se encuentran las rutas
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Endpoint para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Base de datos conectada'))
    .catch(err => {
        console.log('Error de conexión a la base de datos, reintentando...', err);
        setTimeout(connectToDatabase, 5000); // Reintentar después de 5 segundos
    });
};

// Conectar a la base de datos
connectToDatabase();

// Rutas
app.use('/api/orders', orderRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
