const Agent = require("../models/Agent");

// Controller to get agent contact info by agent ID
const getAgentContact = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Send agent contact info back to frontend
    res.json({
      firstname: agent.firstname,
      lastname: agent.lastname,
      phoneNumber: agent.phoneNumber,
      email: agent.email,
      location: agent.location,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAgentContact,
};
