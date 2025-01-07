
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');
const User = require('../models/User');  

;

// Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // If valid, generate and return a token
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ success: true, message: token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { loginAdmin};
