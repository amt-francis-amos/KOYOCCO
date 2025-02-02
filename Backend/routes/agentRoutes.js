const express = require('express');
const router = express.Router();

// Mock agent data - replace this with actual database queries
const agents = [
  {
    _id: '1',
    firstname: 'John',
    lastname: 'Doe',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
    location: 'Accra, Ghana',
    profileImage: '/images/agent1.jpg'
  },
  {
    _id: '2',
    firstname: 'Jane',
    lastname: 'Smith',
    phoneNumber: '9876543210',
    email: 'jane.smith@example.com',
    location: 'Kumasi, Ghana',
    profileImage: '/images/agent2.jpg'
  },
  // Add more agents as needed
];

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
