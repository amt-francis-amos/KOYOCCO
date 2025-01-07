const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Debugging: Log received and expected credentials
    console.log("Received Email:", email);
    console.log("Received Password:", password);
    console.log("Expected Email:", process.env.ADMIN_EMAIL);
    console.log("Expected Password:", process.env.ADMIN_PASSWORD);

    // Check if credentials match the admin account
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ success: true, token });
    }

    // Invalid credentials
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { loginAdmin };
