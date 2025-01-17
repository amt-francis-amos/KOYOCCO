const ContactMessage = require('../models/ContactMessage');
const Agent = require('../models/Agent');
const nodemailer = require('nodemailer');

const contactAgent = async (req, res) => {
  try {
    const { agentId, userName, userEmail, message, propertyId, agentEmail } = req.body;

    // Check for required fields
    if (!userName || !userEmail || !message || !propertyId || (!agentId && !agentEmail)) {
      return res.status(400).json({
        message: 'All fields are required: userName, userEmail, message, propertyId, and either agentId or agentEmail',
      });
    }

    let recipientEmail = agentEmail;  // Default to the agentEmail from the body
    let recipientPhone = null;

    // If agentId is provided, find the agent and use their details
    if (agentId && agentId !== 'default-agent-id') {
      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found for the provided agentId' });
      }
      recipientEmail = agent.email;
      recipientPhone = agent.phone;
    } else if (!recipientEmail) {
      // If agentEmail is also not provided, return an error
      return res.status(400).json({ message: 'Recipient email is missing or invalid' });
    }

    // Sending the email to the agent
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: userEmail,
      to: recipientEmail,
      subject: `Contact from ${userName}`,
      text: `
        You have received a message from ${userName} (${userEmail}).
  
        Message: 
        ${message}
  
        Property ID: ${propertyId}
  
        Phone (if available): ${recipientPhone || 'Not provided'}
      `,
    });

    // Save the contact message
    const savedMessage = new ContactMessage({
      userName,
      userEmail,
      message,
      propertyId,
      agentId: agentId !== 'default-agent-id' ? agentId : null,
      agentEmail: recipientEmail,
    });

    await savedMessage.save();

    res.status(200).json({ message: 'Message sent and saved successfully' });
  } catch (error) {
    console.error('Error in contactAgent:', error.message);
    res.status(500).json({ message: 'Failed to contact agent', error: error.message });
  }
};

module.exports = {
  contactAgent,
};
