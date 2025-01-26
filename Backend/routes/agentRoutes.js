const express = require("express");
const { getAgentContact } = require("../controllers/agentController");

const router = express.Router();


router.get("/agent/:agentId", getAgentContact);

module.exports = router;
