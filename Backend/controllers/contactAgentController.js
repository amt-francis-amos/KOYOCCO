const nodemailer = require('nodemailer');
const Agent = require('../models/Agent');

// Contact Agent Function
const contactAgent = async (req, res) => {
  try {
    const { agentId, userName, userEmail, message } = req.body;

    if (!agentId || !userName || !userEmail || !message) {
      return res.status(400).json({ message: 'All fields are required: agentId, userName, userEmail, message' });
    }

 
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const agentEmail = agent.email;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: agentEmail,
      subject: `Contact from ${userName}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to contact agent', error: error.message });
  }
};

module.exports = {
  contactAgent,
};
