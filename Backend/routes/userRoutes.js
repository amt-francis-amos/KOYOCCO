const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();
const router = express.Router();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

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

    let agentId = null;
    if (role === 'Agent') {
      agentId = crypto.randomBytes(16).toString('hex'); 
    }

    // Create new user
    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      role,
      firstname,
      lastname,
      phoneNumber,
      location,
      agentId, 
    });

    await user.save();

    await sendConfirmationEmail(user);

    res.status(201).json({
      message: "Signup successful! Confirmation email sent.",
      role: user.role,
      userId: user._id,
      agentId: user.agentId, 
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate the incoming request
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If the user is an agent, ensure they have an agentId
    if (user.role === 'Agent' && !user.agentId) {
      user.agentId = `AGENT-${user._id.toString().slice(-6)}`;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, agentId: user.agentId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Prepare the response data
    const responseData = {
      token,
      role: user.role,
      userId: user._id,
    };

    // Include agent details if the user is an Agent
    if (user.role === "Agent") {
      const agentDetails = {
        agentId: user.agentId,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        location: user.location,
        profileImage: user.profileImage,
        companyLogo: user.companyLogo,
      };
      responseData.agentDetails = agentDetails;
    }

    // Include owner details if the user is a Property Owner
    if (user.role === "Property Owner") {
      const ownerDetails = {
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        location: user.location,
        profileImage: user.profileImage, // Adjust if needed or remove if not available
      };
      responseData.ownerDetails = ownerDetails;
    }

    res.status(200).json(responseData);
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
    user.resetPasswordExpires = Date.now() + 3600000;
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

module.exports = router;
