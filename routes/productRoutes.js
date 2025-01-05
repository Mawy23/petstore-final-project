const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Crear un nuevo producto (requiere autenticación y rol de admin)
router.post('/', verifyToken, productController.createProduct);

// Actualizar producto
router.put('/:id', productController.updateProduct);

// Eliminar producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
