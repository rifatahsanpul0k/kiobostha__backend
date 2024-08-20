const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const loginMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied: No Authorization Header' });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(400).json({ message: 'Access Denied: No Token Provided' });
    }

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ message: 'Internal Server Error: JWT Secret Missing' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = loginMiddleware;