const nodemailer = require('nodemailer');


const contactAgent = async (req, res) => {
  try {
    const { agentId, userName, userEmail, message, propertyId, agentEmail } = req.body;


    if (!userName || !userEmail || !message || !propertyId || (!agentId && !agentEmail)) {
      return res.status(400).json({
        message: 'All fields are required: userName, userEmail, message, propertyId, and either agentId or agentEmail',
      });
    }


    console.log('Request Body:', req.body);


    let recipientEmail = agentEmail; 
    if (agentId) {
    
      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found for the provided agentId' });
      }
      recipientEmail = agent.email;
    }


    if (!recipientEmail) {
      return res.status(400).json({ message: 'Recipient email is missing or invalid' });
    }


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    transporter.verify((error, success) => {
      if (error) {
        console.error('Transporter verification failed:', error);
        return res.status(500).json({ message: 'Error configuring email service', error: error.message });
      }
      console.log('Transporter is ready:', success);
    });

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


    await transporter.sendMail(mailOptions);


    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error in contactAgent:', error.message);
    res.status(500).json({ message: 'Failed to contact agent', error: error.message });
  }
};

module.exports = {
  contactAgent,
};
