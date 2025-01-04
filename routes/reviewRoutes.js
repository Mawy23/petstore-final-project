const express = require('express');
const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');  // Middleware de verificación de JWT

const router = express.Router();

// Ruta para crear una reseña
router.post('/', verifyToken, reviewController.createReview);

// Ruta para obtener reseñas de un producto
router.get('/:productId', reviewController.getReviewsByProduct);

module.exports = router;
