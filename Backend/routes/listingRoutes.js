const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js');
const Listing = require('../models/Listing');

router.post('/', multerConfig.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'] || [];
    const video = req.files['video'] || [];

    // Log multer file processing details
    console.log('Files Uploaded:', req.files);

    // Validation: Ensure all required fields are provided
    if (!title || !description || photos.length === 0 || video.length === 0) {
      console.log('Missing Fields:', { title, description, photos, video });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Extract file paths for photos and video
    const photosUrls = photos.map(photo => photo.path);
    const videoUrl = video[0]?.path;

    // Validate parsed data
    if (!photosUrls.length) {
      console.log('Invalid Photos:', photosUrls);
      return res.status(400).json({ error: 'At least one photo is required' });
    }

    if (!videoUrl) {
      console.log('Invalid Video:', videoUrl);
      return res.status(400).json({ error: 'Video is required' });
    }

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
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.errors);
      return res.status(400).json({
        error: 'Validation error',
        details: Object.keys(error.errors).map(field => ({
          field,
          message: error.errors[field].message,
        })),
      });
    }

    console.error('Unexpected Error:', error);
    res.status(500).json({ error: 'Error saving listing', details: error.message });
  }
});

module.exports = router;
