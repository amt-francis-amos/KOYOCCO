const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware.js');
const User = require('../models/User');
const Booking = require('../models/Booking'); 

// Admin dashboard route
router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    const bookings = await Booking.find();
    console.log("Fetched users:", users); // Log fetched users
    console.log("Fetched bookings:", bookings); // Log fetched bookings
    res.json({ users, bookings });
  } catch (err) {
    console.error('Error:', err); // Log any error
    res.status(500).json({ message: 'Error fetching data' });
  }
});


// Other admin routes
router.get("/admin/users", authenticateToken, (req, res) => {
  res.json({ message: "Manage users" });
});

// Add other admin routes as needed...

module.exports = router;
