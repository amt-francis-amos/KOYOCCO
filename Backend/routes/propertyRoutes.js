require('dotenv').config();
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
router.post('/upload', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, price, location, type } = req.body;

    if (!name || !price || !location || !type) {
      return res.status(400).json({ message: 'Missing required fields: name, price, location, or type' });
    }

    // Validate type
    const validTypes = ['Apartment', 'House', 'Land', 'Office', 'Other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    // Handle image uploads
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

    // Handle video upload if provided
    let video = null;
    if (req.files.video && req.files.video.length > 0) {
      video = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }).end(req.files.video[0].buffer);
      });
    }

    // Create a new property
    const property = new Property({
      name,
      description,
      price,
      location,
      type,
      images,
      video,
    });

    await property.save();
    res.status(200).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload property', error: error.message });
  }
});

module.exports = router;
