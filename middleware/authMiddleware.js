const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token no válido' });
            } else {
                // Guardar los datos del usuario decodificados en la solicitud para usarlos más tarde
                req.userData = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'Acceso denegado. Token requerido' });
    }
};

module.exports = { verifyToken };
