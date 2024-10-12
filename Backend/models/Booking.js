const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  propertyId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
