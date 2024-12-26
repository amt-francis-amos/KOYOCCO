const jwt = require("jsonwebtoken");

const authenticateToken2 = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }

    next();
  });
};

module.exports = authenticateToken2;
