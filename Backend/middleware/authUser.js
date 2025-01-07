const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header
    const authHeader = req.headers['authorization'];  // or 'Authorization' based on case sensitivity
    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    // Extract token from the format "Bearer <token>"
    const token = authHeader.split(' ')[1]; // This will get the token after 'Bearer'
    
    if (!token) {
      return res.json({
        success: false,
        message: "Token missing from Authorization header",
      });
    }

    // Verify the token using JWT
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = authUser;
