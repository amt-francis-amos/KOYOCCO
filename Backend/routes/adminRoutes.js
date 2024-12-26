const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware.js');
const User = require('../models/User');  // Import User model
const Booking = require('../models/Booking');  // Import Booking model

// Admin dashboard route
router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    // Fetch users and bookings from the database
    const users = await User.find();  // Adjust this to fetch users
    const bookings = await Booking.find();  // Adjust this to fetch bookings
    res.json({ users, bookings });  // Send the data as response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Other admin routes
router.get("/admin/users", authenticateToken, (req, res) => {
  res.json({ message: "Manage users" });
});

// Add other admin routes as needed...

module.exports = router;
