const express = require("express");
const { getAgentContact } = require("../controllers/agentController");
const router = express.Router();


router.get("/:agentId/contact", getAgentContact);

module.exports = router;
