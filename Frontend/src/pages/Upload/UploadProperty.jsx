// UploadProperty.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadProperty = ({ onUpload }) => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    images: [],
    video: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setPropertyData({ ...propertyData, images: [...files] });
    } else if (name === 'video') {
      setPropertyData({ ...propertyData, video: files[0] });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(propertyData).forEach((key) => {
      if (key === 'images') {
        propertyData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else if (key === 'video') {
        formData.append('video', propertyData[key]);
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    try {
      const response = await axios.post('https://koyocco-backend.onrender.com/api/properties/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      // Reset form after successful upload
      setPropertyData({
        name: '',
        description: '',
        price: '',
        location: '',
        images: [],
        video: null,
      });
      setMessage('Property uploaded successfully!'); // Success message
      onUpload(); // Call the onUpload function to refresh property list
    } catch (error) {
      console.error('Error uploading property:', error.response ? error.response.data : error.message);
      setMessage('Failed to upload property. Please try again.'); // Error message
    }
  };

  return (
    <div className="max-w-[600px] mx-auto mt-10 mb-20 p-5 bg-white shadow-md">
      <h2 className="text-2xl mb-4">Upload Property</h2>
      {message && <div className="mb-4 text-red-500">{message}</div>} {/* Display message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={propertyData.name}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={propertyData.description}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={propertyData.price}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={propertyData.location}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        />
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-red-500 text-white rounded p-2">
          Upload Property
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;
