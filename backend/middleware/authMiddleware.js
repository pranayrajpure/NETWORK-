const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Check if token exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token using JWT_SECRET from .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user payload to request
        next(); // Proceed to the protected route handler
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;