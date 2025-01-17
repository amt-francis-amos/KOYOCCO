const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ }, // Added email regex validation
  phone: { 
    type: String, 
    required: true, 
    match: /^(?:\+?\d{1,2}\s?)?(?:\(?\d{2,4}\)?[\s\-]?)?\d{6,10}$/ 
  },
});

module.exports = mongoose.model('Agent', AgentSchema);
