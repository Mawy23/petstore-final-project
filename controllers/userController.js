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

const register = async (req, res) => {
    const { username, password, role = 'user' } = req.body;

    try {
        console.log('Buscando si el usuario ya existe...');
        const userExists = await User.findOne({ username });
        console.log("Usuario encontrado:", userExists);

        if (userExists) {
            console.log("El usuario ya existe.");
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        console.log('Creando nuevo usuario...');
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        console.log("Nuevo usuario:", newUser);

        await newUser.save();
        console.log("Usuario guardado correctamente.");

        const token = jwt.sign(
            { id: newUser._id, username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token });
    } catch (err) {
        console.error("Error al registrar el usuario:", err.message);
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

module.exports = { login, register, getProfile };
