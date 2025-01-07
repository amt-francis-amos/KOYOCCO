const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Secret should match the one used in login
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
