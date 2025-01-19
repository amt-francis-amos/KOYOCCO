const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  condition: { type: String, required: true },
  region: { type: String, required: true },
  propertyType: { type: String, required: true },
  address: { type: String }, 
  images: [String],
  video: String,
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
});

module.exports = mongoose.model('Property', propertySchema);
