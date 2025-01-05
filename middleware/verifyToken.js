const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtenemos el token del encabezado Authorization (formato: "Bearer <token>")
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    try {
        // Decodificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificamos que el token contenga el 'id' en el payload
        if (!decoded.id) {
            return res.status(400).json({ message: "El token no contiene un id válido" });
        }

        // Agregamos el id al objeto req
        req.userId = decoded.id;

        console.log('Token Decodificado:', decoded);  // Verifica el contenido del token decodificado

        // Continuamos con la siguiente función
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ message: "Token inválido", error: error.message });
    }
};

module.exports = verifyToken;
