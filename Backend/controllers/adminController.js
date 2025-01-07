const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    console.log("Received Email:", email);
    console.log("Received Password:", password);
    console.log("Expected Email:", process.env.ADMIN_EMAIL);
    console.log("Expected Password:", process.env.ADMIN_PASSWORD);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        success: true,
        message: "Login successful",
        token, // Ensure 'token' is included in the response
      });
    }

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
