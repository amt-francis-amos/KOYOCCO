const nodemailer = require('nodemailer');

// Contact Agent Function
const contactAgent = async (req, res) => {
  try {
    const { agentId, userName, userEmail, message, propertyId, agentEmail } = req.body;

    // Check if all required fields are provided
    if (!userName || !userEmail || !message || !propertyId || (!agentId && !agentEmail)) {
      return res.status(400).json({
        message: 'All fields are required: userName, userEmail, message, propertyId, and either agentId or agentEmail',
      });
    }

    // Log the incoming request for debugging
    console.log('Request Body:', req.body);

    // Determine the agent email
    let recipientEmail = agentEmail; // Default to the agentEmail provided in the request
    if (agentId) {
      // Fetch agent email from the database if agentId is provided
      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found for the provided agentId' });
      }
      recipientEmail = agent.email;
    }

    // Check if the recipient email is valid
    if (!recipientEmail) {
      return res.status(400).json({ message: 'Recipient email is missing or invalid' });
    }

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
      to: recipientEmail,
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
