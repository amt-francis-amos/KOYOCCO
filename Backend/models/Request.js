const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, enum: ['relocation'], required: true },
  details: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  carType: { type: String, required: true },
  description: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  region: { type: String, required: true },
  driverContact: { type: String, required: true },
  carImages: [{ type: String }],  // Store Cloudinary image URLs
});

module.exports = mongoose.model('Request', requestSchema);
