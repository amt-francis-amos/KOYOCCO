// Required dependencies
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 



const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Verify the user's credentials
  const user = await User.findOne({ email });  // Replace with actual logic
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);  // Assuming you hash passwords
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,  // This is the token being sent to the frontend
  });
};


module.exports = { loginAdmin };
