const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
 
  const token = req.header("Authorization")?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired token
    res.status(403).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
