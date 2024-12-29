const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model for role validation if needed

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid authorization header format' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally, fetch user details from the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user details and role to the request object
    req.user = { id: user._id, role: user.role };

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    const errorMessage =
      err.name === 'TokenExpiredError'
        ? 'Token expired'
        : 'Invalid token';

    return res.status(403).json({
      message: errorMessage,
      errorCode: err.name,
    });
  }
};

module.exports = authenticateToken;
