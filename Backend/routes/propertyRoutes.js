require('dotenv').config(); // Load environment variables

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

console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload property route
router.post('/upload', upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);

  try {
    const { name, description, price, location } = req.body;

    // Check if the required fields are present
    if (!name || !price || !location) {
      return res.status(400).json({ message: 'Missing required fields: name, price, or location' });
    }

    // Handle image uploads
    let images = [];
    if (req.files.images) {
      images = await Promise.all(
        req.files.images.map((image) =>
          new Promise((resolve, reject) => {
            console.log('Uploading image...');
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) {
                console.error('Cloudinary image upload error:', error);
                return reject(`Image upload failed: ${error.message}`);
              }
              console.log('Image uploaded:', result.secure_url);
              resolve(result.secure_url);
            }).end(image.buffer);
          })
        )
      );
    }

    // Handle video upload if provided
    let video = null;
    if (req.files.video && req.files.video.length > 0) {
      video = await new Promise((resolve, reject) => {
        console.log('Uploading video...');
        cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
          if (error) {
            console.error('Cloudinary video upload error:', error);
            return reject(`Video upload failed: ${error.message}`);
          }
          console.log('Video uploaded:', result.secure_url);
          resolve(result.secure_url);
        }).end(req.files.video[0].buffer);
      });
    }

    // Create a new property document
    const property = new Property({
      name,
      description,
      price,
      location,
      images,
      video,
    });

    // Save the property to the database
    await property.save();
    res.status(200).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    console.error('Error uploading property:', error);
    res.status(500).json({ message: 'Failed to upload property', error: error.message || error });
  }
});

// --GET route to retrieve all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties from the database
    res.status(200).json(properties); // Send the properties back as a JSON response
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message || error });
  }
});

// Add delete property route
// Add delete property route
router.delete('/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findByIdAndDelete(propertyId);
    
    if (!property) {
      // Return 404 if the property was not found in the database
      return res.status(404).json({ message: 'Property not found' });
    }

    // Send success response if the property was deleted successfully
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.message); // Log the error message
    res.status(500).json({ message: 'Failed to delete property', error: error.message });
  }
});


module.exports = router;
