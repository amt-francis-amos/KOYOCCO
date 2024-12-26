const jwt = require("jsonwebtoken");



const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Authorization header:", authHeader);
  console.log("Token extracted:", token);

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied, token missing' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT verification failed:", err);
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }

    console.log("User verified:", user);

    req.user = user;

    // Check if the user is an admin
    if (user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Access denied, admin only' });
    }

    next();
  });
};

module.exports = authenticateToken;

