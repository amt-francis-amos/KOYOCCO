const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware.js');  



router.get("/dashboard", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();  
    const bookings = await Booking.find();  
    res.json({ users, bookings });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});



// Other admin routes
router.get("/admin/users", authenticateToken, (req, res) => {
  res.json({ message: "Manage users" });
});

// Other routes...
module.exports = router;
