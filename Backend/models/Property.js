const mongoose = require('mongoose');

// Property Schema definition
const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, enum: ['Apartment', 'House', 'Land', 'Office', 'Other'] },
  images: [{ type: String }],
  video: { type: String, default: "" },
  status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
}, { timestamps: true });


PropertySchema.index({ location: 1, status: 1 });


module.exports = mongoose.model('Property', PropertySchema);
