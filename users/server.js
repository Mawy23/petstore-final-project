const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('../routes/productRoutes');
const reviewRoutes = require('../routes/reviewRoutes');
const userRoutes = require('../routes/userRoutes');

dotenv.config();
const app = express();

app.use(express.json());

// Conectar a la base de datos
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.log('Error de conexión a la base de datos:', err));


// Rutas
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
