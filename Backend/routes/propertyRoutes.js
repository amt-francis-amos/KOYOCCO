const express = require('express');
const multer = require('multer');
const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary configuration (ensure you have your cloud name, API key, and API secret)
cloudinary.config({
  cloud_name: 'CLOUD_NAME', 
  api_key: 'API_KEY',      
  api_secret: 'API_SECRET',
});

// Helper function to upload an image to Cloudinary
const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

// Helper function to upload a video to Cloudinary
const uploadVideo = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

// Upload property route
router.post('/upload', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, price, location } = req.body;

    const images = await Promise.all(req.files.images.map((image) => uploadImage(image)));
    const video = req.files.video ? await uploadVideo(req.files.video[0]) : null;

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
    res.status(500).json({ message: 'Error uploading property', error });
  }
});

module.exports = router;
