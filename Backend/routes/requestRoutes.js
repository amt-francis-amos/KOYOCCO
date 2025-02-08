const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Request = require("../models/Request");
const { Readable } = require("stream");

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const upload = multer({ storage: multer.memoryStorage() });


const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "car_images" }, 
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

// Create Request Route
router.post("/create", upload.array("carImages", 5), async (req, res) => {
  try {
    const { userName, userEmail, phone, date, location, carType, description, registrationNumber, region, driverContact } = req.body;

    // Check if all required fields are provided
    if (!userName || !userEmail || !phone || !date || !location || !carType || !description || !registrationNumber || !region || !driverContact) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Upload images to Cloudinary
    const carImages = req.files.length
      ? await Promise.all(req.files.map((file) => uploadToCloudinary(file.buffer)))
      : [];

    // Create New Request
    const newRequest = new Request({
      userName,
      userEmail,
      phone,
      date,
      location,
      carType,
      description,
      registrationNumber,
      region,
      driverContact,
      carImages, 
    });

    await newRequest.save();

    res.status(201).json({ message: "Request created successfully", request: newRequest });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Get All Requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
