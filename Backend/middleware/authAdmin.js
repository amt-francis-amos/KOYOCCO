const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again.",
      });
    }

    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken); // Debugging

    if (!decodedToken || decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. Invalid Token.",
      });
    }

    next();
  } catch (error) {
    console.error("Authorization Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = authAdmin;
