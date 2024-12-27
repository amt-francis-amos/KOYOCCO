const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js');
const Listing = require('../models/Listing');

router.post('/', multerConfig.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    // Early file existence check
    const { photos, video } = req.files;
    if (!photos || !video) {
      return res.status(400).json({ error: 'Photos and video are required.' });
    }

    const { title, description, isPropertyOwner } = req.body;

    // Field validation
    if (!title || !description || photos.length === 0 || video.length === 0) {
      return res.status(400).json({
        error: 'All fields (title, description, photos, and video) are required.',
      });
    }

    // Extract file paths
    const photosUrls = photos.map(photo => photo.path);
    const videoUrl = video[0]?.path;

    // Validate file paths
    if (!photosUrls.length) {
      return res.status(400).json({ error: 'At least one photo is required' });
    }

    if (!videoUrl) {
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

    // Save to database
    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    console.error('Server Error:', error); // Log full error for debugging
    res.status(500).json({ error: 'Error saving listing', details: error.message });
  }
});

module.exports = router;
