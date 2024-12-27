const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1]; // Extract token
  console.log('Extracted Token:', token);

  if (!token) {
    console.log('Token missing in the request.');
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const errorMessage = err.name === 'TokenExpiredError' 
        ? 'Token expired' 
        : 'Invalid token';
      console.error('Token verification failed:', errorMessage);
      return res.status(403).json({ message: errorMessage });
    }

    console.log('Authenticated User:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
