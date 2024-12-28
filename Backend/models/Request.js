const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  details: { type: String, required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },  // Assuming this is referencing another model
  date: { type: Date, required: true },
  location: { type: String, required: true },
  agentEmail: { type: String, required: true },  // Add the agent email field
});

module.exports = mongoose.model('Request', requestSchema);
