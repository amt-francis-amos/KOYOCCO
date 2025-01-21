const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  condition: { type: String, required: true },
  region: { type: String, required: true },
  propertyType: { 
    type: String, 
    required: true, 
    enum: ['Short-Stay', 'PropertySales', 'PropertyRentals'], 
  },
  address: { type: String, required:true }, 
  images: [String],
  video: String,
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
});

module.exports = mongoose.model('Property', propertySchema);
