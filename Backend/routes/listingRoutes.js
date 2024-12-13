const express = require('express');
const router = express.Router();
const multerConfig = require('../config/multer.js'); 


router.post('/post-listing', multerConfig.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'];
    const video = req.files['video'];


    if (!title || !description || !photos || !video) {
      return res.status(400).json({ error: 'All fields are required' });
    }

   
    const photosUrls = photos.map(photo => photo.path); 
    const videoUrl = video[0].path; 

    const listingData = {
      title,
      description,
      photos: photosUrls,
      video: videoUrl,
      isPropertyOwner,
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
