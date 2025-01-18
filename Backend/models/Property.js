const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, enum: ['Apartment', 'House', 'Land', 'Office', 'Other'] }, // Add property type
  images: [{ type: String }],
  video: { type: String, default: "" },
  status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' },

  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
}, { timestamps: true });

PropertySchema.index({ location: 1, status: 1 });

module.exports = mongoose.model('Property', PropertySchema);
