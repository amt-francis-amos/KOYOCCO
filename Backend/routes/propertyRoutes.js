const express = require('express');
const multer = require('multer');
const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload property route
router.post(
  '/upload',
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), // Limit max count to 10 for multer
  async (req, res) => {
    try {
      const { name, description, price, location, condition, region, propertyType, address } = req.body;

      // Validate required fields
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!price) missingFields.push('price');
      if (!location) missingFields.push('location');
      if (!condition) missingFields.push('condition');
      if (!region) missingFields.push('region');
      if (!propertyType) missingFields.push('propertyType');
      if (!address) missingFields.push('address');

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`,
        });
      }

      // Handle image uploads
      let images = [];
      if (req.files.images) {
        // Check if image count exceeds 10
        if (req.files.images.length > 10) {
          return res.status(400).json({ message: 'You can upload a maximum of 10 images' });
        }

        images = await Promise.all(
          req.files.images.map((image) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                  console.error('Cloudinary image upload error:', error);
                  return reject(`Image upload failed: ${error.message}`);
                }
                resolve(result.secure_url);
              }).end(image.buffer);
            })
          )
        );
      }

      // Handle video upload
      let video = null;
      if (req.files.video) {
        video = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
            if (error) {
              console.error('Cloudinary video upload error:', error);
              return reject(`Video upload failed: ${error.message}`);
            }
            resolve(result.secure_url);
          }).end(req.files.video[0].buffer);
        });
      }

      // Create a new property instance and save it to the database
      const property = new Property({
        name,
        description,
        price,
        location,
        condition,
        region,
        propertyType,
        address,
        images,
        video,
      });

      await property.save();
      res.status(200).json({ message: 'Property uploaded successfully', property });
    } catch (error) {
      console.error('Error uploading property:', error);
      res.status(500).json({ message: 'Failed to upload property', error: error.message });
    }
  }
);

// Get all properties route
router.get('/all', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
  }
});

// Delete a property route
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete property', error: error.message });
  }
});

// Update property status route
router.put('/update-status/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const property = await Property.findByIdAndUpdate(id, { status }, { new: true });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update property status', error: error.message });
  }
});

module.exports = router;
