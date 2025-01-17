const nodemailer = require('nodemailer');
const Agent = require('../models/Agent');
const ContactMessage = require('../models/ContactMessage');
const mongoose = require('mongoose');

const contactAgent = async (req, res) => {
    try {
        const { agentId, userName, userEmail, message, propertyId } = req.body;

       
        if (!userName || !userEmail || !message || !propertyId || !agentId) {
            return res.status(400).json({
                message: 'All fields are required: userName, userEmail, message, propertyId, and agentId',
            });
        }

        let recipientEmail = null;
        let recipientPhone = null;

       
        if (agentId && agentId !== 'default-agent-id') {
          
            if (!mongoose.Types.ObjectId.isValid(agentId)) {
                return res.status(400).json({ message: 'Invalid agentId format' });
            }

            const agent = await Agent.findById(agentId);
            if (!agent) {
                return res.status(404).json({ message: 'Agent not found for the provided agentId' });
            }

            recipientEmail = agent.email;
            recipientPhone = agent.phone;
        } else {
           
            recipientEmail = process.env.FALLBACK_EMAIL;
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
