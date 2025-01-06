const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Petstore API',
        version: '1.0.0',
        description: 'API for managing petstore',
      },
      host: 'localhost:3000', 
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
    apis: ['./routes/*.js'], // Ruta donde están los archivos de tus rutas
  };
  

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = (app) => {
  // Configuración para servir la documentación de Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
