// Enhanced property routes with validations and improved error handling

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
const upload = multer({ storage });

router.post(
  '/upload',
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        location,
        address,
        condition,
        region,
        propertyType,
        shortStayType,
        propertySalesType,
        propertyRentalsType,
      } = req.body;

      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!price) missingFields.push('price');
      if (!location) missingFields.push('location');
      if (!address) missingFields.push('address');
      if (!condition) missingFields.push('condition');
      if (!region) missingFields.push('region');
      if (!propertyType) missingFields.push('propertyType');

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(', ')}`,
        });
      }

      if (propertyType === 'Short-Stay' && !shortStayType) {
        return res.status(400).json({
          message: 'Short-Stay type is required for Short-Stay properties.',
        });
      }

      if (propertyType === 'PropertySales' && !propertySalesType) {
        return res.status(400).json({
          message: 'Property sales type is required for Property Sales properties.',
        });
      }

      if (propertyType === 'PropertyRentals' && !propertyRentalsType) {
        return res.status(400).json({
          message: 'Property rentals type is required for Property Rentals properties.',
        });
      }

      // Cloudinary uploads
      let images = [];
      if (req.files.images) {
        if (req.files.images.length > 5) {
          return res.status(400).json({ message: 'You can upload a maximum of 5 images.' });
        }

        images = await Promise.all(
          req.files.images.map((image) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                  if (error) {
                    console.error('Cloudinary image upload error:', error);
                    return reject(`Image upload failed: ${error.message}`);
                  }
                  resolve(result.secure_url);
                }
              ).end(image.buffer);
            })
          )
        );
      }

      let video = null;
      if (req.files.video && req.files.video.length > 0) {
        video = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: 'video' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary video upload error:', error);
                return reject(`Video upload failed: ${error.message}`);
              }
              resolve(result.secure_url);
            }
          ).end(req.files.video[0].buffer);
        });
      }

      const property = new Property({
        name,
        description,
        price,
        location,
        address,
        condition,
        region,
        propertyType,
        shortStayType,
        propertySalesType,
        propertyRentalsType,
        images,
        video,
      });

      await property.save();
      res.status(201).json({ message: 'Property uploaded successfully.', property });
    } catch (error) {
      console.error('Error uploading property:', error);
      res.status(500).json({ message: 'Failed to upload property.', error: error.message });
    }
  }
);

module.exports = router;
