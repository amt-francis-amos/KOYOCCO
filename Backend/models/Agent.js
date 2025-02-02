
const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema(
  {
  
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    location: {
      type: String,
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', AgentSchema);
