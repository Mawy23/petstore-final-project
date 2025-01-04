const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Crear un nuevo producto (requiere autenticación)
router.post('/', productController.createProduct);

// Actualizar producto
router.put('/:id', productController.updateProduct);

// Eliminar producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
