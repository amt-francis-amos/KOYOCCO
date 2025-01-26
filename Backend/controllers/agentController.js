const Agent = require("../models/Agent");

const getAgentContact = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    console.log("Agent ID:", agentId); 
    
    const agent = await Agent.findById(agentId);

    if (!agent) {
      console.log("Agent not found.");
      return res.status(404).json({ message: "Agent not found" });
    }

    console.log("Agent found:", agent);
    res.json({
      firstname: agent.firstname,
      lastname: agent.lastname,
      phoneNumber: agent.phoneNumber,
      email: agent.email,
      location: agent.location,
    });
  } catch (error) {
    console.error("Error in fetching agent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAgentContact };
