require('dotenv').config(); // Load environment variables

const express = require('express');
const multer = require('multer');
const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2; // Import Cloudinary

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Check if Cloudinary is configured correctly (optional)
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload property route
router.post('/upload', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, price, location } = req.body;

    const images = await Promise.all(
      req.files.images.map((image) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
              console.error('Cloudinary image upload error:', error);
              return reject('Image upload failed');
            }
            resolve(result.secure_url);
          }).end(image.buffer);
        })
      )
    );

    const video = req.files.video
      ? await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
            if (error) {
              console.error('Cloudinary video upload error:', error);
              return reject('Video upload failed');
            }
            resolve(result.secure_url);
          }).end(req.files.video[0].buffer);
        })
      : null;

    const property = new Property({
      name,
      description,
      price,
      location,
      images,
      video,
    });

    await property.save();
    res.status(201).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    console.error('Error uploading property:', error);
    res.status(500).json({ message: 'Failed to upload property', error: error.message || error });
  }
});

module.exports = router;
