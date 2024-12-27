const multer = require('multer');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === 'video' ? 'videos' : 'photos';
    cb(null, `./uploads/${folder}/`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter for file type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Multer configuration for photos and video
const multerConfig = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size (10MB)
});

module.exports = multerConfig;
