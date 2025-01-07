const bycrpt = require ('bcrypt');
const jwt = require("jsonwebtoken");
const User = require ('../models/User');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Corrected bcrypt import
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Consistent naming for the User model

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

const UserModel = mongoose.model('User', UserSchema);

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
