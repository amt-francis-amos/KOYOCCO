const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where the image will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with a timestamp
  },
});

const upload = multer({ storage });

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching profile for User ID:", req.user.userId);
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile (basic info)
router.put("/profile", authenticateToken, async (req, res) => {
  const { firstname, lastname, phoneNumber, location } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstname, lastname, phoneNumber, location },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Upload profile image
router.post("/upload-profile-image", authenticateToken, upload.single('profileImage'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const imagePath = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { profileImage: imagePath },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Profile image uploaded successfully", profileImage: imagePath });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
