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

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con el rol
    const newUser = new User({ username, password: hashedPassword, role });

    // Guardar el nuevo usuario en la base de datos
    try {
        await newUser.save();
        // Generar el token
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

module.exports = { login, register, getProfile };
