const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require('../middleware/auth.middleware');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Configuration for Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
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
router.post("/upload-profile-image", authenticateToken, upload.single("profileImage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "profile-images" },
      async (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        // Update User Profile with Cloudinary URL
        const user = await User.findByIdAndUpdate(
          req.user.userId,
          { profileImage: result.secure_url },
          { new: true }
        ).select("-password");

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile image uploaded successfully", profileImage: result.secure_url });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
