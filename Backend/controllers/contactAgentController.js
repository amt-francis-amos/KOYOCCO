const nodemailer = require('nodemailer');
const Agent = require('../models/Agent');
const Contact = require('../models/ContactModel'); 

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

        // Save the contact request in the database
        const contactRequest = new Contact({
            customerName: userName,
            customerEmail: userEmail,
            message,
            propertyId,
            agentId,
        });
        await contactRequest.save();

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
            html: `
                <p>You have received a message from <strong>${userName}</strong> (${userEmail}).</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p><strong>Property ID:</strong> ${propertyId}</p>
                <p><strong>Phone (if available):</strong> ${recipientPhone || 'Not provided'}</p>
            `,
        });

        res.status(200).json({ message: `Message sent to ${recipientEmail} successfully.` });
    } catch (error) {
        console.error('Error in contactAgent:', error.stack);
        res.status(500).json({ message: 'Failed to contact agent', error: error.message });
    }
};

module.exports = {
    contactAgent,
};
