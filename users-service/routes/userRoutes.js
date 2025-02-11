const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica a un usuario y devuelve un token JWT.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario1"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Token de autenticación
 *       400:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en la plataforma.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario2"
 *               password:
 *                 type: string
 *                 example: "contraseña456"
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener el perfil del usuario
 *     description: Retorna los detalles del perfil del usuario autenticado.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Actualizar usuario
 *     description: Permite actualizar los datos del usuario autenticado.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nuevoUsuario"
 *               password:
 *                 type: string
 *                 example: "nuevaContraseña"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       401:
 *         description: No autorizado
 *
 * /api/users/delete:
 *   delete:
 *     summary: Eliminar usuario
 *     description: Elimina el usuario autenticado.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */

router.put('/update', verifyToken, userController.updateUser);
router.delete('/delete', verifyToken, userController.deleteUser);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/profile', verifyToken, userController.getProfile);
router.get('/', userController.getUsers);

// Nueva ruta para obtener los pedidos del usuario
router.get('/orders', verifyToken, userController.getUserOrders);

module.exports = router;
