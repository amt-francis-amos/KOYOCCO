
const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');


router.get('/:agentId', async (req, res) => {
  const { agentId } = req.params;
  try {
   
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
