const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true }, 
  address: { type: String, required: true }, 
  region: { type: String, required: true },
  condition: { type: String, enum: ['Newly built', 'Innovated', 'Used'], required: true }, 
  propertyType: { type: String, required: true }, 
  images: [{ type: String }], 
  video: { type: String },
  status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' }, 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }, 
});

module.exports = mongoose.model('Property', PropertySchema);
