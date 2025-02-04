import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    phone: '',
    serviceType: 'relocation',
    details: '',
    date: '',
    location: '',
    carType: '',
    description: '',
    registrationNumber: '',
    region: '',
    driverContact: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { userName, userEmail, phone, serviceType, date, location, carType, description, registrationNumber, region, driverContact } = formData;

    if (!userName || !userEmail || !phone || !serviceType || !date || !location || !carType || !description || !registrationNumber || !region || !driverContact) {
      toast.error('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://koyocco-backend.onrender.com/api/requests/create', formData);

      if (response.status === 201) {
        toast.success('Relocation request submitted successfully!');
        setFormData({
          userName: '',
          userEmail: '',
          phone: '',
          serviceType: 'relocation',
          details: '',
          date: '',
          location: '',
          carType: '',
          description: '',
          registrationNumber: '',
          region: '',
          driverContact: '',
        });

        navigate('/cars');
      } else {
        toast.error('Failed to submit request.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('An error occurred while submitting the request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Request a Relocation</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Email Address" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        
        {/* New Car Details Fields */}
        <input type="text" name="carType" value={formData.carType} onChange={handleChange} placeholder="Car Type" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Car Description" required />
        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" required />
        <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Region" required />
        <input type="text" name="driverContact" value={formData.driverContact} onChange={handleChange} placeholder="Driver Contact Info" required />

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
