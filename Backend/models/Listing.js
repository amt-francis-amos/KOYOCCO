
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true }, 
  image: { type: String, required: true },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
