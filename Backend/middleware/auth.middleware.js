const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("Token missing");
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed", err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    console.log("User verified:", user);

    req.user = user;

    // Check if the user is an admin
    if (user.role !== 'admin') {
      console.log("Access denied, not an admin");
      return res.status(403).json({ message: 'Access denied, admin only' });
    }

    next();
  });
};

module.exports = authenticateToken;
