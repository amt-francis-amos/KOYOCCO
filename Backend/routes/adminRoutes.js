const express = require("express");
const router = express.Router();

const { loginAdmin, registerUser, loginUser } = require("../controllers/adminController");



// Register a new user
router.post('/signup', registerUser);

router.post('/login', loginUser);
router.post('/singin', loginAdmin);


module.exports = router;
