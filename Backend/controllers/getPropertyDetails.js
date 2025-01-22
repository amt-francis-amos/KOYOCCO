
const Property = require('../models/Property');

const getPropertyDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate('agent', 'name email phone');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPropertyDetails };
