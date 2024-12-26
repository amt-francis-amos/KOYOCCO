const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware.js');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Dashboard data route
router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const users = await User.find(); // Fetch users
    const bookings = await Booking.find(); // Fetch bookings
    res.json({ users, bookings });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: `Error fetching data: ${err.message}` });
  }
});

// Admin users route
router.get("/admin/users", authenticateToken, (req, res) => {
  res.json({ message: "Manage users" });
});

module.exports = router;
