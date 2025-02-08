const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Request = require('../models/Request'); 
const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Setup for Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// -- POST request to create a relocation request
router.post('/create', upload.array('carImages', 5), async (req, res) => {
  try {
    const {
      userName, userEmail, phone, date, location, 
      carType, description, registrationNumber, region, driverContact,
    } = req.body;

    if (!userName || !userEmail || !phone || !date || !location || !carType || !description || !registrationNumber || !region || !driverContact) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

  

    let carImages = [];
    if (req.files) {
      carImages = await Promise.all(
        req.files.map((image) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }).end(image.buffer);
          })
        )
      );
    }

    const newRequest = new Request({
      userName, userEmail, phone, serviceType, details, date, location, 
      carType, description, registrationNumber, region, driverContact, carImages
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ success: true, data: savedRequest });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// -- GET request to fetch all relocation requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
