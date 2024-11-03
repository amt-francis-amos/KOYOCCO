const express = require('express');
const multer = require('multer');
const Property = require('../models/Property');
const Agent = require('../models/Agent'); 
const router = express.Router();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'CLOUD_NAME', 
  api_key: 'API_KEY',      
  api_secret: 'API_SECRET',
});


const storage = multer.memoryStorage();
const upload = multer({ storage });


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

  
      if (!req.files || !req.files.images || req.files.images.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
      }


      const uploadToCloudinary = (file, resourceType) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
            if (error) {
              return reject(new Error(error.message));
            }
            resolve(result.secure_url); 
          });
          stream.end(file.buffer); 
        });
      };


      const imageUploadPromises = req.files.images.map(file => uploadToCloudinary(file, 'image'));


      const videoUploadPromise = req.files.video
        ? uploadToCloudinary(req.files.video[0], 'video')
        : Promise.resolve(null);

   
      const [images, video] = await Promise.all([
        Promise.all(imageUploadPromises), 
        videoUploadPromise                
      ]);

 
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

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
