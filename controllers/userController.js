const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Para encriptar las contraseñas

// Simulación de usuarios en memoria
let users = [
    { 
        username: 'user1', 
        password: bcrypt.hashSync('pass1', 10),  // Cifra 'pass1'
        role: 'user' 
    }
];


// Función para login
const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
            { id: user._id, username, role: user.role },  // Incluye estos datos en el token
            process.env.JWT_SECRET,  
            { expiresIn: '1h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

// Función para registro de usuario
const register = (req, res) => {
    const { username, password, role = 'user' } = req.body;

    // Verificar si el usuario ya existe
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: "El usuario ya existe." });
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crear un nuevo usuario
    const newUser = { username, password: hashedPassword, role };
    users.push(newUser);

    // Generar el token
    const token = jwt.sign(
        { id: newUser._id, username, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(201).json({ token });
};

// Función para obtener perfil del usuario
const getProfile = (req, res) => {
    res.json({ 
        message: 'Perfil de usuario', 
        user: req.userData  // Devuelve los datos decodificados
    });
};

module.exports = { login, register, getProfile };
