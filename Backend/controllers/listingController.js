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
router.post('/upload', upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);

  try {
    // Destructuring data from the request body
    const { name, description, location, price } = req.body;

    // Validate the required fields
    if (!name || !description || !location || !price) {
      return res.status(400).json({ message: 'Name, description, location, and price are required.' });
    }

    // Handle image uploads to Cloudinary
    let photos = [];
    if (req.files.photos) {
      photos = await Promise.all(
        req.files.photos.map((photo) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) {
                console.error('Error uploading image:', error);
                return reject(error);
              }
              resolve(result.secure_url);
            }).end(photo.buffer);
          })
        )
      );
    }

    // Handle video upload to Cloudinary
    let video = null;
    if (req.files.video) {
      video = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
          if (error) {
            console.error('Error uploading video:', error);
            return reject(error);
          }
          resolve(result.secure_url);
        }).end(req.files.video[0].buffer);
      });
    }

    // Create a new property document with the uploaded data
    const property = new Property({
      name,
      description,
      location,
      price,
      photos,
      video,
    });

    // Save the property to the database
    await property.save();
    res.status(200).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    console.error('Error uploading property:', error);
    res.status(500).json({ message: 'Failed to upload property', error: error.message });
  }
});

module.exports = router;
