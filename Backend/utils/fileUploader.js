
const cloudinary = require('./cloudinaryConfig');

const uploadToCloudinary = (fileBuffer, resourceType) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: resourceType }, (error, result) => {
      if (error) {
        console.error(`Error uploading ${resourceType}:`, error);
        return reject(error);
      }
      resolve(result.secure_url);
    }).end(fileBuffer);
  });
};

// Handles multiple file uploads
const uploadMultipleFiles = (files, resourceType) => {
  return Promise.all(files.map(file => uploadToCloudinary(file.buffer, resourceType)));
};

module.exports = {
  uploadToCloudinary,
  uploadMultipleFiles,
};
