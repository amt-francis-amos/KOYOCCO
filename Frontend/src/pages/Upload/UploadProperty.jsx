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

  // Function to format the price for display
  const formatPrice = (value) => {
    // Remove any non-numeric characters (except commas and decimal)
    const rawValue = value.replace(/[^0-9.]/g, '');
    const number = parseFloat(rawValue);

    if (isNaN(number)) return '';

    // Format the number with commas and two decimal places
    return number.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'images') {
      setPropertyData({ ...propertyData, images: [...files] });
    } else if (name === 'video') {
      setPropertyData({ ...propertyData, video: files[0] });
    } else if (name === 'price') {
      // Format the price but save the raw value for submission
      const formattedPrice = formatPrice(value);
      setPropertyData({
        ...propertyData,
        price: formattedPrice,
      });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Get the raw price (remove formatting)
    const rawPrice = propertyData.price.replace(/[^0-9.]/g, ''); // Remove any non-numeric characters

    Object.keys(propertyData).forEach((key) => {
      if (key === 'images') {
        propertyData.images.forEach((image) => {
          formData.append('images', image);
        });
      } else if (key === 'video') {
        formData.append('video', propertyData[key]);
      } else if (key === 'price') {
        formData.append(key, rawPrice); // Append raw price for backend
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

      setPropertyData({
        name: '',
        description: '',
        price: '',
        location: '',
        images: [],
        video: null,
      });
      setMessage('Property uploaded successfully!');
      navigate('/property-list'); // Redirect to PropertyList page
    } catch (error) {
      console.error('Error uploading property:', error.response ? error.response.data : error.message);
      setMessage('Failed to upload property. Please try again.');
    }
  };

  return (
    <div className="max-w-[500px] mx-auto mt-10 mb-20 p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Property</h2>
      {message && <div className="mb-4 text-red-500">{message}</div>} {/* Display message */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={propertyData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={propertyData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          rows="3"
        />
        <input
          type="number"
          name="price"
          placeholder="₵ Price"
          value={propertyData.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={propertyData.location}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images:</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video:</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white font-bold rounded-md p-2 hover:bg-red-700 transition duration-200">
          Upload Property
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;
