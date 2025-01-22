const Property = require('../models/Property');

const getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getPropertyDetails };
