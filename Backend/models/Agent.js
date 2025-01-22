const mongoose = require('mongoose');


const AgentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  profileImage: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Agent', AgentSchema);
