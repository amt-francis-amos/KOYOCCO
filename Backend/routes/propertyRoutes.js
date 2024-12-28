require('dotenv').config();
const express = require('express');
const multer = require('multer');
const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;
const { uploadToCloudinary, uploadMultipleFiles } = require('../utils/fileUploader');

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
  try {
    const { name, description, price, location } = req.body;

    if (!name || !price || !location) {
      return res.status(400).json({ message: 'Name, price, and location are required.' });
    }

    const images = req.files.images ? await uploadMultipleFiles(req.files.images, 'image') : [];
    const video = req.files.video ? await uploadToCloudinary(req.files.video[0].buffer, 'video') : null;

    const property = new Property({ name, description, price, location, images, video });
    await property.save();

    res.status(200).json({ message: 'Property uploaded successfully', property });
  } catch (error) {
    console.error('Error uploading property:', error);
    res.status(500).json({ message: 'Failed to upload property', error: error.message });
  }
});


// GET route to retrieve all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message || error });
  }
});

// DELETE route to delete a property
router.delete('/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    console.log('Deleting property with ID:', propertyId);
    const property = await Property.findByIdAndDelete(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.message);
    res.status(500).json({ message: 'Failed to delete property', error: error.message });
  }
});

// PUT route to update the status of a property
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Check if a valid status is provided
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    // Update the property status
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('Error updating property status:', error);
    res.status(500).json({ message: 'Failed to update property status' });
  }
});

module.exports = router;
