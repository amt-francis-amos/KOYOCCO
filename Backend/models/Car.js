const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carType: { type: String, required: true },
  description: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  region: { type: String, required: true },
  driverContact: { type: String, required: true }
});

module.exports = mongoose.model('Car', carSchema);
