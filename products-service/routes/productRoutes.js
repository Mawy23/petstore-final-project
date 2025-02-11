const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');
const axios = require('axios');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos en la tienda
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos.
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Collar para perro"
 *                   description:
 *                     type: string
 *                     example: "Collar de cuero para perros de tamaño grande"
 *                   price:
 *                     type: number
 *                     example: 20.99
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna los detalles de un producto específico.
 *     tags: [Productos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Collar para perro"
 *                 description:
 *                   type: string
 *                   example: "Collar de cuero para perros de tamaño grande"
 *                 price:
 *                   type: number
 *                   example: 20.99
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crear un producto en la tienda. Requiere autenticación y rol de admin.
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Collar para perro"
 *               description:
 *                 type: string
 *                 example: "Collar de cuero para perros de tamaño grande"
 *               price:
 *                 type: number
 *                 example: 20.99
 *               category:
 *                 type: string
 *                 example: "Accesorios"
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Datos inválidos
 *       403:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza los detalles de un producto existente.
 *     tags: [Productos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nuevo collar para perro"
 *               description:
 *                 type: string
 *                 example: "Collar de cuero para perros de tamaño pequeño"
 *               price:
 *                 type: number
 *                 example: 22.99
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto existente por su ID.
 *     tags: [Productos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products/{id}/details:
 *   get:
 *     summary: Obtener detalles del producto con resumen de reseñas
 *     description: Retorna los detalles de un producto específico junto con un resumen de las reseñas.
 *     tags: [Productos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del producto con resumen de reseñas
 *       404:
 *         description: Producto no encontrado
 */

// Rutas para productos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Nueva ruta para obtener detalles del producto con resumen de reseñas
router.get('/:id/details', productController.getProductDetailsWithReviews);

// Nueva ruta para actualizar el stock de un producto
router.put('/:id/update-stock', productController.updateProductStock);

// Ruta para obtener un producto por su ID
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);  // Retorna el producto si lo encuentra
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
});

module.exports = router;
