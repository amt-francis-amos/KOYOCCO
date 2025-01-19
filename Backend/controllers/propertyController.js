const Property = require('../models/Property');
const cloudinary = require('../config/cloudinaryConfig');

const uploadProperty = async (req, res) => {
  try {
    const { name, description, price, location } = req.body;

    if (!name || !price || !location) {
      return res.status(400).json({ message: 'Missing required fields: name, price, or location' });
    }

    // Image Uploads
    let images = [];
    if (req.files.images) {
      images = await Promise.all(
        req.files.images.map((image) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }).end(image.buffer);
          })
        )
      );
    }

    // Video Upload
    let video = null;
    if (req.files.video) {
      video = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }).end(req.files.video[0].buffer);
      });
    }

    const property = new Property({ name, description, price, location, images, video });
    await property.save();

    res.status(200).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload property', error: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);

    if (!property) return res.status(404).json({ message: 'Property not found' });

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete property', error: error.message });
  }
};

const updatePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const property = await Property.findByIdAndUpdate(id, { status }, { new: true });

    if (!property) return res.status(404).json({ message: 'Property not found' });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update property status', error: error.message });
  }
};

module.exports = {
  uploadProperty,
  getAllProperties,
  deleteProperty,
  updatePropertyStatus,
};
