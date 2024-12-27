const express = require('express');
const cloudinary = require('../config/cloudinary'); // Import cloudinary configuration

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;

    // Field validation
    if (!title || !description) {
      return res.status(400).json({
        error: 'Title and description are required.',
      });
    }

    const photos = req.files?.photos || [];
    const video = req.files?.video || [];

    // File existence check
    if (photos.length === 0 || video.length === 0) {
      return res.status(400).json({ error: 'Photos and video are required.' });
    }

    // Upload photos to Cloudinary
    const uploadedPhotos = [];
    for (let i = 0; i < photos.length; i++) {
      const uploadResponse = await cloudinary.uploader.upload(photos[i].path, {
        folder: 'property_listings/photos',
      });
      uploadedPhotos.push(uploadResponse.secure_url); // Store the Cloudinary URL
    }

    // Upload video to Cloudinary
    const uploadedVideo = await cloudinary.uploader.upload(video[0].path, {
      resource_type: 'video', // Specify that it's a video
      folder: 'property_listings/videos',
    });

    // Prepare listing data
    const listingData = {
      title,
      description,
      photos: uploadedPhotos,
      video: uploadedVideo.secure_url, // Cloudinary video URL
      isPropertyOwner: JSON.parse(isPropertyOwner),
    };

    // Save to database (replace this with your actual database logic)
    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Error saving listing', details: error.message });
  }
});

module.exports = router;
