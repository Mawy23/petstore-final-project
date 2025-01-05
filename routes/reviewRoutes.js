const express = require('express');
const reviewController = require('../controllers/reviewController');  // Asegúrate de que la ruta sea correcta
const verifyToken = require('../middleware/verifyToken');  // Middleware de verificación de JWT

const router = express.Router();

// Ruta para crear una reseña
router.post('/', verifyToken, reviewController.createReview);

// Ruta para obtener reseñas de un producto
router.get('/:productId', reviewController.getReviewsByProduct);  // Asegúrate de que esté bien importado el controlador

module.exports = router;
