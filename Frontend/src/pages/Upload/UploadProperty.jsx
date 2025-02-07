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
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  // Function to format price with commas
  const formatPrice = (value) => {
    // Remove any non-digit character, then format with commas
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle input changes
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
    } else if (name === 'price') {
      // Format price input with commas
      setPropertyData({ ...propertyData, price: formatPrice(value) });
    } else {
      setPropertyData({ ...propertyData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, location, condition, region, propertyType, address } = propertyData;
    if (!name || !price || !location || !condition || !region || !propertyType || !address) {
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
      await axios.post(
        'https://koyocco-backend.onrender.com/api/properties/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
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
      });

      setImagePreviews([]);

      // Navigate to homepage after successful upload
      navigate('/');
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
        
        <div className="flex items-center space-x-2">
          <span className="text-xl">₵</span>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={propertyData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          />
        </div>

        <select name="propertyType" value={propertyData.propertyType} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full focus:outline-none">
          <option value="">Select Property Type</option>
          <option value="Short-Stay">Short-Stay</option>
          <option value="PropertySales">Property Sales</option>
          <option value="PropertyRentals">Property Rentals</option>
        </select>

        <select name="condition" value={propertyData.condition} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full focus:outline-none">
        <option value="">Select Condition</option>
  <option value="Newly built">Newly built</option>
  <option value="Renovated">Renovated</option>
  <option value="Fairly Used">Fairly Used</option>
  <option value="Virgin Land">Virgin Land</option>
  <option value="Old House">Old House</option>
</select>

        <select name="region" value={propertyData.region} onChange={handleChange} required className="border border-gray-300 rounded-md p-2 w-full focus:outline-none">
          <option value="">Select Region</option>
          {['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Northern', 'Volta', 'Central', 'Upper East', 'Upper West', 'Savannah', 'Bono', 'Bono East', 'Ahafo', 'Oti', 'Western North', 'North East'].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images (Max 10):</label>
          <input type="file" name="images" multiple accept="image/*" onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full focus:outline-none" />
        </div>
        
        <button type="submit" className="w-full bg-red-600 text-white font-bold rounded-md p-2 hover:bg-red-700 transition duration-200">
          Upload Property
        </button>
      </form>
    </div>
  );
};

export default UploadProperty;
