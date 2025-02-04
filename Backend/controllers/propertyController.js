const Property = require('../models/Property');
const cloudinary = require('../config/cloudinaryConfig');
const User = require("../models/User"); 


const uploadProperty = async (req, res) => {
  try {
    const { name, description, price, location, condition, region, propertyType, address } = req.body;
    const ownerId = req.user.id; // Assuming user authentication middleware adds `req.user.id`

    // Fetch the user's details
    const user = await User.findById(ownerId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use owner's company logo or default
    const companyLogo = user.companyLogo || "https://res.cloudinary.com/dkvs0lnab/image/upload/default-logo.png";

    // Handle images upload with company logo overlay
    let images = [];
    if (req.files?.images) {
      images = await Promise.all(req.files.images.map(async (image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, result) => {
            if (error) return reject(error);

            // Apply transformation: blur logo in the center of the image
            const modifiedImage = cloudinary.url(result.public_id, {
              transformation: [
                { width: 800, height: 600, crop: "fill" }, // Resize image
                {
                  overlay: companyLogo,
                  width: 150,
                  opacity: 50,
                  effect: "blur:300", // Apply blur effect to logo
                  gravity: "center",
                },
              ],
            });

            resolve(modifiedImage);
          }).end(image.buffer);
        });
      }));
    }

    // Handle video upload if provided
    let video = null;
    if (req.files?.video) {
      video = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: "video" }, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }).end(req.files.video[0].buffer);
      });
    }

    const property = new Property({
      name,
      description,
      price,
      location,
      address,
      region,
      condition,
      propertyType,
      images,
      video,
      owner: ownerId, // Link property to owner
    });

    await property.save();
    res.status(200).json({ message: "Property uploaded successfully", property });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload property", error: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const { propertyType } = req.query;

    let filter = {};
    if (propertyType) {
      filter.propertyType = propertyType;
    }

   
    const properties = await Property.find(filter).populate("owner", "companyLogo");

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties", error: error.message });
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
