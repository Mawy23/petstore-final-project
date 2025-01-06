const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Importamos el modelo de usuario

// Función para login
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
};

// Función para registro de usuario
const register = async (req, res) => {
    const { username, password, role = 'user' } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, role });

    try {
        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(201).json({ message: 'Usuario registrado con éxito', token });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
    }
};

// Obtener perfil del usuario
const getProfile = (req, res) => {
    res.json({
        message: 'Perfil de usuario',
        user: req.userData
    });
};

// Actualizar usuario
const updateUser = async (req, res) => {
    const userId = req.userId;  // ID del usuario autenticado
    const { username, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.json({ message: 'Usuario actualizado con éxito', user });
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: err.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await User.findByIdAndDelete(userId);

        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: err.message });
    }
};

module.exports = { login, register, getProfile, updateUser, deleteUser };
