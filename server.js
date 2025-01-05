const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());

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
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);  // Cambiado a '/api/reviews' para mantener consistencia
app.use('/api/users', userRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
