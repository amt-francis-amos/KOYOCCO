const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: [{ type: String }],
  video: { type: String },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' } 
});

module.exports = mongoose.model('Property', PropertySchema);