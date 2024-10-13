const mongoose = require('mongoose');

// Define the Agent schema
const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }] 
});

// Export the Agent model
module.exports = mongoose.model('Agent', AgentSchema);
