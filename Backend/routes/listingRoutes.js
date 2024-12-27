const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js');
const Listing = require('../models/Listing');

router.post('/', multerConfig.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    // Check if files exist
    if (!req.files['photos'] || !req.files['video']) {
      return res.status(400).json({ error: 'Photos and video are required.' });
    }

    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'] || [];
    const video = req.files['video'] || [];

    // Log the uploaded files
    console.log('Files Uploaded:', req.files);

    // Ensure required fields are provided
    if (!title || !description || photos.length === 0 || video.length === 0) {
      console.log('Missing Fields:', { title, description, photos, video });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Extract file paths
    const photosUrls = photos.map(photo => photo.path);
    const videoUrl = video[0]?.path;

    // Validate file paths
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
      isPropertyOwner: JSON.parse(isPropertyOwner),
    };

    console.log('Listing Data:', listingData);

    // Save to database
    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    console.error('Server Error:', error); // Log full error
    res.status(500).json({ error: 'Error saving listing', details: error.message });
  }
});

module.exports = router;
