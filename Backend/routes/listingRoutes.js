// routes/listing.js
const express = require("express");
const multer = require("multer");
const Listing = require("../models/Listing");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to post a listing
router.post(
  "/post-listing",
  upload.fields([{ name: "photos" }, { name: "video" }]),
  async (req, res) => {
    const { title, description, isPropertyOwner } = req.body;
    const photos = req.files["photos"];
    const video = req.files["video"];

    if (!title || !description || !photos || !video) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save listing data to the database
    const listingData = {
      title,
      description,
      photos: photos.map((photo) => photo.path),
      video: video[0].path,
      isPropertyOwner,
    };

    try {
      const newListing = new Listing(listingData);
      await newListing.save();
      res.status(201).json({ message: "Listing posted successfully", listing: newListing });
    } catch (err) {
      res.status(500).json({ error: "Error saving listing" });
    }
  }
);

module.exports = router;
