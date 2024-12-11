const express = require('express');
const router = express.Router();
const upload = require('./multerConfig'); 

router.post('/post-listing', upload.fields([{ name: 'photos' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files['photos'];
    const video = req.files['video'];

    // If no photos or video are uploaded
    if (!title || !description || !photos || !video) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Map over photos and store Cloudinary URLs
    const photosUrls = photos.map(photo => photo.path); // Cloudinary URL
    const videoUrl = video[0].path; // Cloudinary URL

    const listingData = {
      title,
      description,
      photos: photosUrls,
      video: videoUrl,
      isPropertyOwner,
    };

    // Save to your database (example with mongoose)
    const newListing = new Listing(listingData);
    await newListing.save();

    res.status(201).json({ message: 'Listing posted successfully', listing: newListing });
  } catch (error) {
    console.error('Error occurred while posting listing:', error);
    res.status(500).json({ error: 'Error saving listing' });
  }
});

module.exports = router;
