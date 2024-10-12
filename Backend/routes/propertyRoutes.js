const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Property = require('../models/Property');

const router = express.Router();

// Directory to store uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Post route to upload property
router.post(
  '/',
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { title, description, price, location } = req.body;

      // Handle uploaded files
      const images = req.files.images ? req.files.images.map(file => file.filename) : [];
      const video = req.files.video ? req.files.video[0].filename : null;

      // Create new property with uploaded files
      const newProperty = new Property({
        title,
        description,
        price,
        location,
        images,  // Save array of image filenames
        video,   // Save video filename
      });

      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (error) {
      console.error('Error uploading property:', error.message); 
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// Get route to fetch a single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property:', error.message); 
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get route to fetch all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error.message); 
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete route to remove a property and its associated media files
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Delete associated images and video files
    const deletionPromises = [];

    // Delete associated images
    property.images.forEach(image => {
      const filePath = path.join(uploadDir, image);
      deletionPromises.push(new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting image file:', err);
            return reject(err);
          }
          resolve();
        });
      }));
    });

    // Delete associated video
    if (property.video) {
      const filePath = path.join(uploadDir, property.video);
      deletionPromises.push(new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting video file:', err);
            return reject(err);
          }
          resolve();
        });
      }));
    }

    // Wait for all file deletions to complete
    await Promise.all(deletionPromises);

    // Delete the property document from the database
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Serve uploaded files as static resources
router.use('/uploads', express.static(uploadDir));

module.exports = router;
