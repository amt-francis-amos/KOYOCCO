const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Property = require('../models/Property');
const Agent = require('../models/Agent'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const uniqueFilename = uuidv4() + '-' + file.originalname; 
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });


const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return reject(err);
      }
      resolve();
    });
  });
};


router.post(
  '/',
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]),
  async (req, res) => {
    try {
      const { title, description, price, location, agentId } = req.body;


      const agent = await Agent.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }

      const images = req.files.images ? req.files.images.map(file => file.filename) : [];
      const video = req.files.video ? req.files.video[0].filename : null;

      const newProperty = new Property({
        title,
        description,
        price,
        location,
        images, 
        video,  
        agent: agentId, 
      });

      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (error) {
      console.error('Error uploading property:', error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);


router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ property });
  } catch (error) {
    console.error('Error fetching property:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('agent'); 
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }


    const deletionPromises = [];


    property.images.forEach(image => {
      const filePath = path.join(uploadDir, image);
      deletionPromises.push(deleteFile(filePath));
    });

    if (property.video) {
      const filePath = path.join(uploadDir, property.video);
      deletionPromises.push(deleteFile(filePath));
    }

    await Promise.all(deletionPromises);


    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.use('/uploads', express.static(uploadDir));

module.exports = router;
