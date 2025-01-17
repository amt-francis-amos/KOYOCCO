const ContactMessage = require('../models/ContactMessage');
const Agent = require('../models/Agent');
const nodemailer = require('nodemailer');

const contactAgent = async (req, res) => {
    try {
      const { agentId, userName, userEmail, message, propertyId, agentEmail } = req.body;
  
      // Validate input fields
      if (!userName || !userEmail || !message || !propertyId || (!agentId && !agentEmail)) {
        return res.status(400).json({
          message: 'All fields are required: userName, userEmail, message, propertyId, and either agentId or agentEmail',
        });
      }
  
      console.log('Request Body:', req.body);
  
      // Default to agentEmail if no agentId is provided
      let recipientEmail = agentEmail;
      let recipientPhone = null;
  
      // If agentId is provided, try to find the agent in the database
      if (agentId && agentId !== 'default-agent-id') {
        console.log('Agent ID:', agentId);
        const agent = await Agent.findById(agentId);
  
        // If no agent is found, return an error
        if (!agent) {
          return res.status(404).json({ message: 'Agent not found for the provided agentId' });
        }
        // Use the found agent's email and phone
        recipientEmail = agent.email;
        recipientPhone = agent.phone;
      }
  
      // Ensure a valid recipientEmail is set
      if (!recipientEmail) {
        return res.status(400).json({ message: 'Recipient email is missing or invalid' });
      }
  
      console.log(`Sending email to ${recipientEmail}, Phone: ${recipientPhone || 'Not provided'}`);
  
      // Create the email transporter using nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Send the email
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
  
      // Save the contact message to the database
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
