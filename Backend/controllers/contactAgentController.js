const nodemailer = require('nodemailer');
const Agent = require('../models/Agent');

// Contact Agent Function
const contactAgent = async (req, res) => {
  try {
    const { agentId, userName, userEmail, message, propertyId } = req.body;

    // Check if all required fields are provided
    if (!agentId || !userName || !userEmail || !message || !propertyId) {
      return res.status(400).json({ message: 'All fields are required: agentId, userName, userEmail, message, propertyId' });
    }

    // Log propertyId for debugging
    console.log('Request Body:', req.body);

    // Find the agent by agentId
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Extract the agent's email
    const agentEmail = agent.email;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('Transporter verification failed:', error);
        return res.status(500).json({ message: 'Error configuring email service', error: error.message });
      }
      console.log('Transporter is ready:', success);
    });

    // Define the email options
    const mailOptions = {
      from: userEmail,
      to: agentEmail,
      subject: `Contact from ${userName}`,
      text: `
        You have received a message from ${userName} (${userEmail}).
        
        Message: 
        ${message}
        
        Property ID: ${propertyId}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contactAgent:', error.message);
    res.status(500).json({ message: 'Failed to contact agent', error: error.message });
  }
};

module.exports = {
  contactAgent,
};
