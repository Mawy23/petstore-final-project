const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');  // Añade el middleware para las rutas protegidas

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);  // Ruta para registro de usuario
router.get('/profile', verifyToken, userController.getProfile);  // Protege esta ruta

module.exports = router;
