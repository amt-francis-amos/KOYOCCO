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

// Upload property route
router.post('/upload', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, price, location } = req.body;

    const images = await Promise.all(
      req.files.images.map(image => 
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) return res.status(500).json({ message: 'Image upload failed' });
          return result.secure_url;
        })
      )
    );

    const video = req.files.video ? await cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
      if (error) return res.status(500).json({ message: 'Video upload failed' });
      return result.secure_url;
    }) : null;

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
    res.status(500).json({ message: 'Error uploading property', error });
  }
});

module.exports = router;
