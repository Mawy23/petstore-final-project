const jwt = require('jsonwebtoken');

// Middleware para verificar el token y validar el rol de admin
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Acceso denegado. No se proporcionó un token." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token no válido" });
        }

        // Guardar datos decodificados del token en la solicitud para acceso futuro
        req.userData = decoded;

        // Verificar si el usuario tiene el rol de admin
        if (req.userData.role !== 'admin') {
            return res.status(403).json({ message: "Acceso denegado. Solo los administradores pueden crear productos." });
        }

        next(); // Si es admin, continúa con la siguiente acción
    });
};

module.exports = verifyToken;
