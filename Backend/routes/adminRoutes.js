const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../controllers/adminController");
const verifyToken = require("../middleware/authAdmin");  

router.post("/login", loginAdmin);

router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Welcome to the dashboard",
    user: req.user  // You can access the decoded user data here
  });
});

module.exports = router;
