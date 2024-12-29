const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware.js');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

// Admin Dashboard route
router.get("/dashboard", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    const bookings = await Booking.find(); 
    res.json({ users, bookings });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ message: `Error fetching data: ${err.message}` });
  }
});

// Example of another admin-only route
router.get("/admin/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "Manage users", users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: `Error fetching users: ${err.message}` });
  }
});

module.exports = router;
