const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/petstore', {  // Cambia esta URL si usas MongoDB Atlas
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado a MongoDB');
})
.catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
});
