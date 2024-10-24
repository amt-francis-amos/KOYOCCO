const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const multer = require('multer'); 



const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
db();

// Multer storage setup
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Route to upload images/videos
app.post('/', upload.any(), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: file.mimetype.startsWith('video') ? 'video' : 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        file.stream.pipe(uploadStream);
      });
    });

    const results = await Promise.all(uploadPromises);
    const mediaUrls = results.map(result => result.secure_url);
    res.status(200).json(mediaUrls);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Serve static files from the "uploads" directory if needed
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
// (Uncomment this only if you are serving existing static files)


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes); 


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Default 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
