const express = require('express');
const router = express.Router();




// Get agent by ID
router.get('/:agentId', (req, res) => {
  const agent = agents.find(agent => agent._id === req.params.agentId);
  if (agent) {
    res.status(200).json(agent);
  } else {
    res.status(404).json({ message: 'Agent not found' });
  }
});

module.exports = router;
