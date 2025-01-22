const express = require('express');
const Agent = require('../models/Agent'); 
const authenticateToken = require('../middleware/auth.middleware'); 
const router = express.Router();

router.get('/agent/:id', authenticateToken, async (req, res) => {
    console.log("Agent ID:", req.params.id); // Add this line to check the value of the ID
    try {
      const agent = await Agent.findById(req.params.id); 
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
  
      res.json({
        firstname: agent.firstname,
        lastname: agent.lastname,
        phoneNumber: agent.phoneNumber,
        email: agent.email,
        profileImage: agent.profileImage,
        location: agent.location,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
