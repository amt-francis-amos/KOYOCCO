const ContactMessage = require('../models/ContactMessage');
const Agent = require('../models/Agent');
const nodemailer = require('nodemailer');

const contactAgent = async (req, res) => {
    try {
      const { agentId, userName, userEmail, message, propertyId, agentEmail, agentPhone } = req.body;
  
      // Check if essential fields are present, and ensure that either agentId or agentEmail is provided
      if (!userName || !userEmail || !message || !propertyId || (!agentId && !agentEmail)) {
        return res.status(400).json({
          message: 'All fields are required: userName, userEmail, message, propertyId, and either agentId or agentEmail',
        });
      }
  
      // Log the request body for debugging
      console.log('Request Body:', req.body);
  
      let recipientEmail = agentEmail;  // Default to agentEmail if provided
      let recipientPhone = null;        // Initialize phone number as null
  
      if (agentId && agentId !== 'default-agent-id') {
        console.log('Agent ID:', agentId);
        const agent = await Agent.findById(agentId);
  
        if (!agent) {
          return res.status(404).json({ message: 'Agent not found for the provided agentId' });
        }
  
        recipientEmail = agentEmail; // Use the provided agentEmail if agentId is valid
        recipientPhone = agentPhone; // Use provided phone number if agentId exists
      }
  
      if (!recipientEmail) {
        recipientEmail = 'francismarkamos71@gmail.com';  // Default email if no agent email is found
      }
  
      console.log(`Sending email to ${recipientEmail}, Phone: ${recipientPhone || 'Not provided'}`);
  
      // Set up email transporter using Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Send the email to the agent
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
        agentPhone: recipientPhone,
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
