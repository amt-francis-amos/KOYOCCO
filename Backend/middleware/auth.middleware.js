const jwt = require('jsonwebtoken'); // Assuming you're using JSON Web Tokens (JWT)

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1]; // Extract token
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Save decoded user information in the request object
    next();
  });
};

module.exports = authenticateToken
