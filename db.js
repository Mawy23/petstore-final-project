const mongoose = require('mongoose');
require('dotenv').config();  // Cargar variables de entorno desde el .env

const MONGO_URI = process.env.DB_URI || 'mongodb://localhost:27017/petstore';

// Conexión a MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`Conectado a MongoDB en ${MONGO_URI}`);
})
.catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
});
