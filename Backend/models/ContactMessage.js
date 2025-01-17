const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  message: { type: String, required: true },
  propertyId: { type: String, required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: false },
  agentEmail: { type: String, required: false },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
