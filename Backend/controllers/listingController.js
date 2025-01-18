
const Listing = require('../models/Listing');

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getListings };
