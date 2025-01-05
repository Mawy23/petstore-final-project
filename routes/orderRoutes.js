const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Permite crear un pedido nuevo. Se requiere estar autenticado.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 description: Dirección de envío del pedido
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pago utilizado para el pedido
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID del producto
 *                     quantity:
 *                       type: integer
 *                       description: Cantidad del producto
 *             example:
 *               shippingAddress: "Calle Falsa 123"
 *               paymentMethod: "Tarjeta de Crédito"
 *               items: [
 *                 { "productId": "123", "quantity": 2 },
 *                 { "productId": "456", "quantity": 1 }
 *               ]
 *     responses:
 *       201:
 *         description: Pedido creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 order:
 *                   type: object
 *                   description: Objeto de pedido creado
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */
router.post('/', verifyToken, orderController.createOrder);

module.exports = router;
