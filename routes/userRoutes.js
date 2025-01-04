const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');  // Añade el middleware que acabamos de crear

const router = express.Router();

router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.getProfile);  // Protege esta ruta

module.exports = router;
