const jwt = require('jsonwebtoken');

// Simulación de usuarios en memoria
const users = [
    { username: 'user1', password: 'pass1', role: 'user' },
    { username: 'admin', password: 'adminpass', role: 'admin' }
];

// Función para login
const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = jwt.sign(
            { username, role: user.role },  // Incluye estos datos en el token
            process.env.JWT_SECRET,  
            { expiresIn: '1h' }
        );
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

// Función para obtener perfil del usuario
const getProfile = (req, res) => {
    res.json({ 
        message: 'Perfil de usuario', 
        user: req.userData  // Devuelve los datos decodificados
    });
};

module.exports = { login, getProfile };
