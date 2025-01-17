const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const ContactMessage = require('../models/ContactMessage');

const contactAgent = async (req, res) => {
    try {
        const { agentId, userName, userEmail, message, propertyId } = req.body;

        // Ensure all required fields are provided
        if (!userName || !userEmail || !message || !propertyId || !agentId) {
            return res.status(400).json({
                message: 'All fields are required: userName, userEmail, message, propertyId, and agentId',
            });
        }

        let recipientEmail = null;
        let recipientPhone = null;

        // Check if agentId is 'default-agent-id' for fallback email
        if (agentId === 'default-agent-id') {
            recipientEmail = process.env.FALLBACK_EMAIL;
            console.log('Fallback email used:', recipientEmail);
        } else {
            // Validate agentId and check if it exists in the database
            if (!mongoose.Types.ObjectId.isValid(agentId)) {
                return res.status(400).json({ message: 'Invalid agentId format' });
            }

            const agent = await Agent.findById(agentId);
            if (!agent) {
                return res.status(404).json({ message: 'Agent not found for the provided agentId' });
            }

            recipientEmail = agent.email;
            recipientPhone = agent.phone;
            console.log('Agent email used:', recipientEmail);
        }

        // Ensure a valid recipient email exists
        if (!recipientEmail) {
            console.error('Recipient email missing:', { recipientEmail });
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

        // Save the contact message to the database
        const newMessage = new ContactMessage({
            agentId,
            userName,
            userEmail,
            message,
            propertyId,
            recipientEmail,
        });
        await newMessage.save();

        res.status(200).json({ message: 'Message sent and saved successfully' });
    } catch (error) {
        console.error('Error in contactAgent:', error.message);
        res.status(500).json({ message: 'Failed to contact agent', error: error.message });
    }
};

module.exports = {
    contactAgent,
};
