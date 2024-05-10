const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        // Continua si es valido
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido' });
    }
};

module.exports = authenticateJWT;
