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
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]),
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

      // Process images upload to Cloudinary
      const imageUrls = [];
      if (req.files.images) {
        for (const image of req.files.images) {
          const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (error) {
                return res.status(500).json({ message: 'Error uploading image' });
              }
              imageUrls.push(result.secure_url);
            }
          );
          image.pipe(result);
        }
      }

      // Process video upload to Cloudinary
      let videoUrl = '';
      if (req.files.video) {
        const videoResult = await cloudinary.uploader.upload_stream(
          { resource_type: 'video' },
          (error, result) => {
            if (error) {
              return res.status(500).json({ message: 'Error uploading video' });
            }
            videoUrl = result.secure_url;
          }
        );
        req.files.video[0].pipe(videoResult);
      }

      // Create a new property document
      const property = new Property({
        name,
        description,
        price,
        location,
        condition,
        region,
        propertyType,
        address, // Added address
        images: imageUrls,
        video: videoUrl,
      });

      // Save property to the database
      await property.save();

      res.status(201).json({
        message: 'Property uploaded successfully!',
        property,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
