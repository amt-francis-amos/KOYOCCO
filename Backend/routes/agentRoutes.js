const express = require('express');
const mongoose = require('mongoose');
const Agent = require('../models/Agent'); 
const authenticateToken = require('../middleware/auth.middleware'); 
const router = express.Router();

// Route to get agent details by ID
router.get('/agent/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid agent ID" });
  }

  console.log("Agent ID:", id);

  try {
    // Find agent by ID
    const agent = await Agent.findById(id); 
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

// Route to create a new agent
router.post('/agent', authenticateToken, async (req, res) => {
  const { firstname, lastname, phoneNumber, email, profileImage, location } = req.body;

  // Validate input data (example of basic validation)
  if (!firstname || !lastname || !phoneNumber || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new agent instance
    const newAgent = new Agent({
      firstname,
      lastname,
      phoneNumber,
      email,
      profileImage,
      location
    });

    // Save the agent to the database
    await newAgent.save();

    // Respond with the newly created agent details
    res.status(201).json({
      message: "Agent created successfully",
      agent: {
        firstname: newAgent.firstname,
        lastname: newAgent.lastname,
        phoneNumber: newAgent.phoneNumber,
        email: newAgent.email,
        profileImage: newAgent.profileImage,
        location: newAgent.location,
      },
    });
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
