const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// -- API FOR ADMIN LOGIN

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log the received credentials for debugging
    console.log("Received credentials:", { email, password });

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, message: token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { loginAdmin };
