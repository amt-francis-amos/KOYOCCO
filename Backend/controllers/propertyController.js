const Property = require('../models/Property');
const cloudinary = require('../config/cloudinaryConfig');

// Helper function for uploading to Cloudinary
const uploadFile = (file, type) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: type }, (error, result) => {
      if (error) reject(error);
      else resolve(result.secure_url);
    }).end(file.buffer);
  });
};

const uploadProperty = async (req, res) => {
  try {
    const { name, description, price, location } = req.body;

    if (!name || !price || !location) {
      return res.status(400).json({ message: 'Missing required fields: name, price, or location' });
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    // Image Uploads
    let images = [];
    if (req.files && req.files.images) {
      images = await Promise.all(req.files.images.map(image => uploadFile(image, 'image')));
    }

    // Video Upload
    let video = null;
    if (req.files && req.files.video) {
      video = await uploadFile(req.files.video[0], 'video');
    }

    const property = new Property({ name, description, price, location, images, video });
    await property.save();

    res.status(200).json({
      message: 'Property uploaded successfully',
      property: { name, description, price, location, images, video }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload property', error: error.message });
  }
};

// Other methods (getAllProperties, deleteProperty, updatePropertyStatus)...


module.exports = {
  uploadProperty,
  getAllProperties,
  deleteProperty,
  updatePropertyStatus,
};
