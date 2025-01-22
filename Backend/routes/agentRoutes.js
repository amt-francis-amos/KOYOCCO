const express = require('express');
const Agent = require('../models/Agent'); 
// const authenticateToken = require('../middleware/auth.middleware'); 
const generateToken = require('../middleware/generateToken');
const router = express.Router();

// Route to get agent details by ID
router.get('/agent/:id', generateToken, async (req, res) => {
  try {
    // Find agent by ID
    const agent = await Agent.findById(req.params.id); 
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Return agent details if found
    res.json({
      firstname: agent.firstname,
      lastname: agent.lastname,
      phoneNumber: agent.phoneNumber,
      email: agent.email,
      profileImage: agent.profileImage,
      location: agent.location,
    });
  } catch (error) {
    // Catch errors and return server error
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
