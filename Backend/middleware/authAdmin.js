const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Forbidden. Access denied." });
    }

    req.admin = decoded; // Attach decoded data to request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Token is invalid or expired." });
  }
};

module.exports = authAdmin;
