const authorizeRole = (requiredRole) => (req, res, next) => {
    if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'No tienes permiso para esta acción' });
    }
    // Continua si tiene el rol
    next();
};

module.exports = authorizeRole;
