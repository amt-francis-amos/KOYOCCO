const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js');
const Listing = require('../models/Listing'); // Assuming you have a Listing model

router.post('/post-listing', multerConfig.fields([{ name: 'photos', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'] || [];
    const video = req.files['video'] || [];

    if (!title || !description || photos.length === 0 || video.length === 0) {
      return res.status(400).json({ error: 'All fields and uploads are required' });
    }

    const photosUrls = photos.map(photo => photo.path);
    const videoUrl = video[0].path;

    const listingData = {
      title,
      description,
      photos: photosUrls,
      video: videoUrl,
      isPropertyOwner: isPropertyOwner === 'true', // Cast to boolean
    };

    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    console.error('Error occurred while posting listing:', error);
    res.status(500).json({ error: 'Error saving listing' });
  }
});

module.exports = router;
