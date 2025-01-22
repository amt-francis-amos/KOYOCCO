
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

// Add agent details to a property
const addAgentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body; // Expecting these values from the request body

    // Find the property by id
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update the property with agent details
    property.agent = { name, email, phone };
    await property.save();

    res.status(200).json({ message: 'Agent details added successfully' });
  } catch (error) {
    console.error('Error adding agent details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPropertyDetails, addAgentDetails };
