
const jwt = require ("jsonwebtoken");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const User = require("../models/User.js");

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Email and password are required." });
  }

  // Debug: Log inputs and expected values
  console.log("Login Attempt:", { email, password });

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Admin Login Successful");
    return res.json({ success: true, message: "Login successful", token });
  }

  console.log("Invalid Admin Credentials");
  res.status(401).json({ success: false, message: "Invalid Credentials" });
};




const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // save user to database
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};






//---- API to  UserLogin

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { loginAdmin, registerUser, loginUser };
