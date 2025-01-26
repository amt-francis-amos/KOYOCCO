const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Invalid authorization header format. Expected format: Bearer <token>' 
    });
  }


  const token = authHeader.split(' ')[1];

 
  if (!token || token.trim() === '') {
    return res.status(401).json({ message: 'No token provided' });
  }


  jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, user) => {
    if (err) {
      const errorMessage = err.name === 'TokenExpiredError' 
        ? 'Token has expired. Please log in again.'
        : 'Invalid token. Please provide a valid token.';
      return res.status(403).json({ 
        message: errorMessage,
        errorCode: err.name, 
      });
    }

    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
