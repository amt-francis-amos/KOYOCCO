const nodemailer = require('nodemailer');
const Agent = require('../models/Agent');


const contactAgent = async (req, res) => {
    try {
        const { agentId, userName, userEmail, message, propertyId, agentEmail } = req.body;

        // Ensure all required fields are provided
        if (!userName || !userEmail || !message || !propertyId || (!agentId && !agentEmail)) {
            return res.status(400).json({
                message: 'All fields are required: userName, userEmail, message, propertyId, and either agentId or agentEmail',
            });
        }

        let recipientEmail = agentEmail;
        let recipientPhone = null;

        // If agentId is provided, try fetching the agent's details
        if (agentId && agentId !== 'default-agent-id') {
            const agent = await Agent.findById(agentId);
            if (!agent) {
                return res.status(404).json({ message: 'Agent not found for the provided agentId' });
            }
            recipientEmail = agent.email;
            recipientPhone = agent.phone;
        }

        // Check if we have a valid email to send the message
        if (!recipientEmail) {
            return res.status(400).json({ message: 'Recipient email is missing or invalid' });
        }

        // Create a transporter for sending email
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

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error in contactAgent:', error.message);
        res.status(500).json({ message: 'Failed to contact agent', error: error.message });
    }
};

module.exports = {
    contactAgent,
};
