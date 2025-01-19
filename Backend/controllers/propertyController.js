const Property = require('../models/Property');
const cloudinary = require('../config/cloudinaryConfig');

const uploadProperty = async (req, res) => {
  try {
    const { name, description, price, location, propertyType } = req.body;

    if (!name || !price || !location || !propertyType) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, price, location, or propertyType" });
    }

    // Image Uploads
    const images = [];
    if (req.files && req.files.images) {
      try {
        for (const image of req.files.images) {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
            folder: "properties/images",
          });
          images.push(result.secure_url);
        }
      } catch (error) {
        return res.status(500).json({ message: "Image upload failed", error: error.message });
      }
    }

    // Video Upload
    let video = null;
    if (req.files && req.files.video) {
      try {
        const result = await cloudinary.uploader.upload(req.files.video[0].path, {
          resource_type: "video",
          folder: "properties/videos",
        });
        video = result.secure_url;
      } catch (error) {
        return res.status(500).json({ message: "Video upload failed", error: error.message });
      }
    }

    const property = new Property({
      name,
      description,
      price,
      location,
      propertyType,
      images,
      video,
    });
    await property.save();

    res.status(200).json({ message: "Property uploaded successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload property", error: error.message });
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
