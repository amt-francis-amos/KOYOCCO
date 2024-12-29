import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadProperty = () => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    images: [],
    video: null,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        propertyData.images.forEach((image) => formData.append('images', image));
      } else if (key === 'video') {
        formData.append('video', propertyData[key]);
      } else {
        formData.append(key, propertyData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/properties/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Property uploaded successfully!');
      setPropertyData({ name: '', description: '', price: '', location: '', images: [], video: null });
      navigate('/properties');
    } catch (error) {
      setMessage('Failed to upload property. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Upload Property</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={propertyData.name}
          onChange={handleChange}
          placeholder="Property Name"
          required
          className="border p-2 w-full mb-3"
        />
        <textarea
          name="description"
          value={propertyData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-3"
        />
        <div className="flex items-center space-x-2">
          <span>₵</span>
          <input
            type="number"
            name="price"
            value={propertyData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border p-2 w-full"
          />
        </div>
        <input
          type="text"
          name="location"
          value={propertyData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="border p-2 w-full mb-3"
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          accept="image/*"
          className="mb-3"
        />
        <input
          type="file"
          name="video"
          onChange={handleChange}
          accept="video/*"
          className="mb-3"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Upload</button>
      </form>
    </div>
  );
};

export default UploadProperty;
