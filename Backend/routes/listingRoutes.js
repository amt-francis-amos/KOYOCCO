const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js'); 

// Define the route to post the listing
router.post('/post-listing', multerConfig.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'];
    const video = req.files['video'];

    // Check if all necessary fields are provided
    if (!title || !description || !photos || !video) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Map over the photos and store Cloudinary URLs
    const photosUrls = photos.map(photo => photo.path); // Assuming Cloudinary URL is stored in 'path'
    const videoUrl = video[0].path; // Cloudinary URL for the video

    const listingData = {
      title,
      description,
      photos: photosUrls,
      video: videoUrl,
      isPropertyOwner,
    };

    // Save to your database (example using mongoose)
    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    console.error('Error occurred while posting listing:', error);
    res.status(500).json({ error: 'Error saving listing' });
  }
});

module.exports = router;
