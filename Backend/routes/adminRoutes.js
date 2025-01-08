const express = require("express");

const router = express.Router();

const { loginAdmin, registerUser, loginUser } = require("../controllers/adminController");
const authAdmin = require('../middleware/authAdmin')


// Register a new user
router.post('/signup', registerUser);

router.post('/login', loginAdmin);

router.get('/protected-route', authAdmin, (req, res) => {
  res.json({ success: true, message: "Access granted to admin route." });
});



module.exports = router;
