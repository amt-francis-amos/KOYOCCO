const nodemailer = require('nodemailer');
const Agent = require('../models/Agent');
const ContactMessage = require('../models/ContactMessage');
const mongoose = require('mongoose'); // Ensure mongoose is required

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

        // Check if the agentId is not 'default-agent-id'
        if (agentId && agentId !== 'default-agent-id') {
            // Validate the agentId as a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(agentId)) {
                return res.status(400).json({ message: 'Invalid agentId format' });
            }

            // Fetch the agent details from the database
            const agent = await Agent.findById(agentId);
            if (!agent) {
                return res.status(404).json({ message: 'Agent not found for the provided agentId' });
            }

            recipientEmail = agent.email;
            recipientPhone = agent.phone;
        } else {
            // If agentId is 'default-agent-id', use the fallback email
            recipientEmail = process.env.FALLBACK_EMAIL; // Get fallback email from the .env file
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
