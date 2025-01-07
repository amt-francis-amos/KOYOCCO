const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Incoming request:", { email, password });
    console.log("Expected credentials:", {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if credentials match the admin account
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("Login successful, token generated:", token);
      return res.json({ success: true, token });
    }

    console.log("Invalid credentials");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: "Server Error" });
  }
};

module.exports = { loginAdmin };
