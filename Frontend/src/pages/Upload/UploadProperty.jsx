import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadProperty = () => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    propertyType: '',
    shortStayType: '',
    propertySalesType: '',
    propertyRentalsType: '',
    condition: '',
    region: '',
    address: '',
    images: [],
    video: null,
    agentId: '',  // Added field for agentId
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const selectedImages = [...files];

      if (selectedImages.length > 10) {
        toast.error('You can only upload up to 10 images.');
        return;
      }

      setPropertyData({ ...propertyData, images: selectedImages });

      const previews = selectedImages.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else if (name === 'video') {
      setPropertyData({ ...propertyData, video: files[0] });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, location, condition, region, propertyType, address, agentId } = propertyData;
    if (!name || !price || !location || !condition || !region || !propertyType || !address || !agentId) {
      toast.error('Please fill in all required fields.');
      return;
    }

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
      const response = await axios.post(
        'https://koyocco-backend.onrender.com/api/properties/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Property uploaded successfully!');
      setPropertyData({
        name: '',
        description: '',
        price: '',
        location: '',
        propertyType: '',
        shortStayType: '',
        propertySalesType: '',
        propertyRentalsType: '',
        condition: '',
        region: '',
        address: '',
        images: [],
        video: null,
        agentId: '',  // Reset agentId
      });
      setImagePreviews([]);
      navigate('/uploadProperty');
    } catch (error) {
      toast.error('Failed to upload property. Please try again.');
    }
  };

  return (
    <div className="max-w-[500px] mx-auto mt-10 mb-20 p-5 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Property</h2>
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
          type="text"
          name="address"
          placeholder="Address"
          value={propertyData.address}
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
        <select
          name="propertyType"
          value={propertyData.propertyType}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        >
          <option value="">Select Property Type</option>
          <option value="Short-Stay">Short-Stay</option>
          <option value="PropertySales">Property Sales</option>
          <option value="PropertyRentals">Property Rentals</option>
        </select>

        {/* Conditionally render options based on propertyType */}
        {propertyData.propertyType === 'Short-Stay' && (
          <select
            name="shortStayType"
            value={propertyData.shortStayType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          >
            <option value="">Select Short-Stay Type</option>
            <option value="Hotels">Hotels</option>
            <option value="Movie House">Movie House</option>
            <option value="Guest House">Guest House</option>
          </select>
        )}
        {propertyData.propertyType === 'PropertySales' && (
          <select
            name="propertySalesType"
            value={propertyData.propertySalesType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          >
            <option value="">Select Sales Type</option>
            <option value="Houses">Houses</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
          </select>
        )}
        {propertyData.propertyType === 'PropertyRentals' && (
          <select
            name="propertyRentalsType"
            value={propertyData.propertyRentalsType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          >
            <option value="">Select Rentals Type</option>
            <option value="Apartments">Apartments</option>
            <option value="Houses">Houses</option>
            <option value="Commercial">Commercial</option>
          </select>
        )}
        <input
          type="text"
          name="agentId"
          placeholder="Agent ID"
          value={propertyData.agentId}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        />
        {/* Handle image and video uploads */}
        <input
          type="file"
          name="images"
          multiple
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        />
        <input
          type="file"
          name="video"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
          Upload Property
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;
