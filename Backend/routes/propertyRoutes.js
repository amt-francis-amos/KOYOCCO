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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload property route
router.post(
  '/upload',
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { name, description, price, location, address, condition, region, propertyType } = req.body;

      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!price) missingFields.push('price');
      if (!location) missingFields.push('location');
      if (!address) missingFields.push('address');
      if (!condition) missingFields.push('condition');
      if (!region) missingFields.push('region');
      if (!propertyType) missingFields.push('propertyType');

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`,
        });
      }

      // Convert price from string to number
      const cleanedPrice = typeof price === 'string' ? Number(price.replace(/,/g, '')) : price;

      if (isNaN(cleanedPrice)) {
        return res.status(400).json({ message: 'Invalid price format' });
      }

      // Handle image uploads
      let images = [];
      if (req.files.images) {
        images = await Promise.all(
          req.files.images.map((image) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              }).end(image.buffer);
            })
          )
        );
      }

      // Handle video upload
      let video = null;
      if (req.files.video && req.files.video.length > 0) {
        video = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }).end(req.files.video[0].buffer);
        });
      }

      // Create and save the property
      const property = new Property({
        name,
        description,
        price: cleanedPrice, // Use the cleaned price
        location,
        address,
        condition,
        region,
        propertyType,
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

// Fetch properties
router.get('/', async (req, res) => {
  try {
    const { propertyType } = req.query;
    const query = propertyType ? { propertyType } : {};

    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
  }
});

module.exports = router;
