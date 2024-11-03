const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Property = require('../models/Property');
const router = express.Router();
require('dotenv').config();


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary configuration (make sure to replace with your own credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Helper function to upload a file to Cloudinary
const uploadToCloudinary = (file, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          console.error(`Error uploading ${resourceType} to Cloudinary:`, error.message);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(file.buffer);
  });
};

// Route to upload property
router.post('/upload', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, price, location } = req.body;

    // Handle images upload
    const imageUrls = [];
    if (req.files.images) {
      for (const image of req.files.images) {
        const imageUrl = await uploadToCloudinary(image, 'image');
        imageUrls.push(imageUrl);
      }
    }

    // Handle video upload
    let videoUrl = null;
    if (req.files.video && req.files.video[0]) {
      videoUrl = await uploadToCloudinary(req.files.video[0], 'video');
    }

    // Save property details to the database
    const property = new Property({
      name,
      description,
      price,
      location,
      images: imageUrls,
      video: videoUrl,
    });

    await property.save();
    res.status(201).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    console.error('Error in /upload route:', error.message);
    res.status(500).json({ message: 'Failed to upload property', error: error.message });
  }
});

module.exports = router;
