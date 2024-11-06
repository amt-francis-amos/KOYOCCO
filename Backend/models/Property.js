const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: {
    cedi: { type: String, required: true }, 
    dollar: { type: String, required: true }, 
  },
  location: { type: String, required: true },
  images: [{ type: String }],
  video: { type: String },
  status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
});

module.exports = mongoose.model('Property', PropertySchema);
