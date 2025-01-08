// Required dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

// Admin Login function
const loginAdmin = async (req, res) => {

  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

  
    if (user.role !== "admin") {
      return res.json({success:false, message: "Unauthorized" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

 
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({sucess:false, message: "Server error" });
  }
};

module.exports = { loginAdmin };
