const express = require("express");
const { loginAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", loginAdmin);

module.exports = router;
