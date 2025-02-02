
const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');


router.get('/:agentId', async (req, res) => {
  const { agentId } = req.params;
  console.log(`Received GET request for agentId: ${agentId}`); 

  try {
    // Attempt to find the agent by ID
    const agent = await Agent.findById(agentId);
    if (!agent) {
      console.log(`Agent not found for ID: ${agentId}`);
      return res.status(404).json({ message: 'Agent not found' });
    }
    console.log('Agent found:', agent);
    res.json(agent);
  } catch (err) {
    console.error('Error fetching agent:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
