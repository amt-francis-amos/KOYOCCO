const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid authorization header format' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, user) => {
    if (err) {
      const errorMessage = err.name === 'TokenExpiredError' 
        ? 'Token expired' 
        : 'Invalid token';
      return res.status(403).json({ 
        message: errorMessage,
        errorCode: err.name 
      });
    }

    req.user = user; // Attach user info (including agent's ID) to the request object
    next();
  });
};

module.exports = authenticateToken;
