const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Booking = require("../models/Booking"); 
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

const router = express.Router();

// Create a transporter for email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send confirmation email with logo
const sendConfirmationEmail = async (user) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: '"Koyocco Ghana Team" <no-reply@app.com>',
    to: user.email,
    subject: "Registration Confirmation",
    html: `
      <div>
        <img src="cid:logo" style="width: 150px;" alt="Koyocco Ghana Logo" />
        <h2>Hello ${user.firstname},</h2>
        <p>Thank you for registering with us!</p>
        <p>Your details:</p>
        <ul style="list-style-type: none; padding: 0;">
          <li><strong>Name:</strong> ${user.firstname} ${user.lastname}</li>
          <li><strong>Email:</strong> ${user.email}</li>
          <li><strong>Role:</strong> ${user.role}</li>
        </ul>
        <p>Best regards,<br>Koyocco Ghana Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../public/images/koyocco-logo.jpeg'),
        cid: 'logo',
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};

// Send reset password email with logo
const sendResetPasswordEmail = async (user, token) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: '"Koyocco Ghana Team" <no-reply@app.com>',
    to: user.email,
    subject: "Password Reset Request",
    html: `
      <div style="text-align: center;">
        <img src="cid:logo" style="width: 50px;" alt="Koyocco Ghana Logo" />
        <h2>Hello ${user.firstname},</h2>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Koyocco Ghana Team</p>
      </div>
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../public/images/koyocco-logo.jpeg'),
        cid: 'logo',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent successfully to:', user.email);
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Could not send reset password email');
  }
};

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password, role, firstname, lastname, phoneNumber, location } = req.body;

  // Validate the incoming request
  if (!email || !password || !role || !firstname || !lastname || !phoneNumber || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create the new user
    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      role,
      firstname,
      lastname,
      phoneNumber,
      location,
    });

    // Save the user in the database
    await user.save();

    // Send the confirmation email
    await sendConfirmationEmail(user);
    res.status(201).json({ message: "Signup successful! Confirmation email sent." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate the incoming request
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Validate the request
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "If the email is registered, you will receive a password reset link.",
      });

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendResetPasswordEmail(user, token);
    res.status(200).json({ message: "Password reset link sent to your email!" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Reset password route
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Admin Log Route
router.get("/admin/logs", async (req, res) => {
  try {
    const users = await User.find({}, 'firstname lastname email signupLog loginLog');
    const bookings = await Booking.find().populate('userId', 'firstname lastname email');

    res.status(200).json({ users, bookings });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router;
