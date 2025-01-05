const express = require('express');
const reviewController = require('../controllers/reviewController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reseñas
 *   description: Gestión de reseñas de productos
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Crear una reseña
 *     description: Permite a un usuario autenticado crear una reseña para un producto.
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "12345"
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Excelente producto, muy recomendado."
 *     responses:
 *       201:
 *         description: Reseña creada
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Obtener reseñas de un producto
 *     description: Retorna todas las reseñas de un producto específico.
 *     tags: [Reseñas]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reseñas
 *       404:
 *         description: Producto no encontrado
 */

router.post('/', verifyToken, reviewController.createReview);
router.get('/:productId', reviewController.getReviewsByProduct);

module.exports = router;
