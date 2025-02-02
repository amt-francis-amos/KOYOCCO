
const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');


// Assuming you have an agent model or access to agent data
router.get("/agent/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const agent = await User.findById(id); // Assuming you're storing agent info in the User model
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json(agent); // Send back the agent details
  } catch (error) {
    console.error("Error fetching agent:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
