const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require('../middleware/auth.middleware');


// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
    try {
      console.log("Fetching profile for User ID:", req.user.userId); // Debug
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
  
  router.put("/profile", authenticateToken, async (req, res) => {
    const { firstname, lastname, phoneNumber, location } = req.body;
    console.log("Updating profile for User ID:", req.user.userId); // Debug
    console.log("Update Data:", { firstname, lastname, phoneNumber, location }); // Debug
  
    try {
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { firstname, lastname, phoneNumber, location },
        { new: true, runValidators: true }
      ).select("-password");
  
      if (!user) {
        console.error("User not found");
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
// Update user profile
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

module.exports = router;
