const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Añadir un producto al carrito
 *     description: Añade un producto al carrito del usuario.
 *     tags:
 *       - Carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: Producto añadido al carrito
 *       401:
 *         description: No autorizado, falta el token JWT
 *       500:
 *         description: Error al añadir al carrito
 */
router.post('/items', verifyToken, cartController.addItemToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Ver los productos en el carrito
 *     description: Muestra los productos actualmente en el carrito del usuario.
 *     tags:
 *       - Carrito
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *       401:
 *         description: No autorizado, falta el token JWT
 *       404:
 *         description: Carrito vacío
 *       500:
 *         description: Error al obtener el carrito
 */
router.get('/', verifyToken, cartController.getCart);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     description: Elimina un producto específico del carrito del usuario.
 *     tags:
 *       - Carrito
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto que se desea eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       401:
 *         description: No autorizado, falta el token JWT
 *       404:
 *         description: Producto no encontrado en el carrito
 *       500:
 *         description: Error al eliminar producto
 */
router.delete('/items/:itemId', verifyToken, cartController.removeItemFromCart);

// Nueva ruta para limpiar el carrito
router.delete('/clear', verifyToken, cartController.clearCart);

module.exports = router;
