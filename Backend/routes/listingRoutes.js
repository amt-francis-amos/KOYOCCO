const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js');
const Listing = require('../models/Listing');


router.post('/', multerConfig.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'];
    const video = req.files['video'];

    // Validation: Ensure all required fields are provided
    if (!title || !description || !photos || !video) {
      console.log('Missing Fields:', { title, description, photos, video });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure `photos` and `video` contain valid files
    if (!Array.isArray(photos) || photos.length === 0) {
      console.log('Photos are missing or invalid:', photos);
      return res.status(400).json({ error: 'Photos are required and must be valid' });
    }

    if (!Array.isArray(video) || video.length === 0) {
      console.log('Video is missing or invalid:', video);
      return res.status(400).json({ error: 'Video is required and must be valid' });
    }

    // Extract file paths for photos and video
    const photosUrls = photos.map(photo => photo.path);
    const videoUrl = video[0].path;

    // Prepare listing data
    const listingData = {
      title,
      description,
      photos: photosUrls,
      video: videoUrl,
      isPropertyOwner: JSON.parse(isPropertyOwner), // Parse boolean from string
    };

    console.log('Listing Data:', listingData);

    // Save the new listing
    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    // Detailed error logging for debugging
    console.error('Error occurred while posting listing:', error);
    res.status(500).json({ error: 'Error saving listing', details: error.message });
  }
});

module.exports = router;
