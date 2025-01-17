const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
    propertyId: { type: String, required: true },
    recipientEmail: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
