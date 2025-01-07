const jwt = require("jsonwebtoken");

// --ADMIN AUTHENTICATION MIDDLEWARE
const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
    if (!atoken) {
      return res.status(401).json({ success: false, message: "Authorization token is required" });
    }

    const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Validate token payload
    if (tokenDecode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not Authorized. Invalid credentials" });
    }

    // Token is valid
    req.admin = tokenDecode; // Optional: attach the payload to `req` for downstream use
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authAdmin;
