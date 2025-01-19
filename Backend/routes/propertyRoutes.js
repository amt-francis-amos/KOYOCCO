require('dotenv').config();
const express = require('express');
const multer = require('multer');
const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;

const router = express.Router();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});


router.post(
  '/upload',
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]),
  async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);

    try {
      const { name, description, price, location, propertyType } = req.body;

   
      if (!name || !price || !location || !propertyType) {
        return res.status(400).json({ message: 'Missing required fields: name, price, location, or propertyType' });
      }

     
      let images = [];
      if (req.files?.images) {
        images = await Promise.all(
          req.files.images.map((image) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                  console.error('Cloudinary image upload error:', error);
                  return reject(`Image upload failed: ${error.message}`);
                }
                resolve(result.secure_url);
              }).end(image.buffer);
            })
          )
        );
      }

     
      let video = null;
      if (req.files?.video?.length > 0) {
        video = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
            if (error) {
              console.error('Cloudinary video upload error:', error);
              return reject(`Video upload failed: ${error.message}`);
            }
            resolve(result.secure_url);
          }).end(req.files.video[0].buffer);
        });
      }

      // Create and save the property
      const property = new Property({
        name,
        description,
        price,
        location,
        propertyType,
        images,
        video,
      });

      await property.save();
      res.status(201).json({ message: 'Property uploaded successfully', property });
    } catch (error) {
      console.error('Error uploading property:', error);
      res.status(500).json({ message: 'Failed to upload property', error: error.message || error });
    }
  }
);


router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Failed to fetch properties', error: error.message || error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
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


router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property status updated successfully', updatedProperty });
  } catch (error) {
    console.error('Error updating property status:', error);
    res.status(500).json({ message: 'Failed to update property status', error: error.message });
  }
});


module.exports = router;
