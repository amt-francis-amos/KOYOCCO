const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware.js');  


router.get("/admin/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

// Other admin routes
router.get("/admin/users", authenticateToken, (req, res) => {
  res.json({ message: "Manage users" });
});

// Other routes...
module.exports = router;
