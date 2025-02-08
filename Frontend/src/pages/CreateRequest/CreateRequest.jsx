import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phone: "",
    date: "",
    region: "",
    location: "",
    carType: "",
    description: "",
    registrationNumber: "",
    driverContact: "",
  });

  const [carImages, setCarImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const regions = [
    "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern", "Greater Accra",
    "North East", "Northern", "Oti", "Savannah", "Upper East", "Upper West",
    "Volta", "Western", "Western North"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + carImages.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    setCarImages([...carImages, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setCarImages(carImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (Object.values(formData).some(value => !value.trim()) || carImages.length === 0) {
      toast.error("Please fill in all fields and upload at least one image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      carImages.forEach((image) => formDataToSend.append("carImages", image));

      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/requests/create",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Relocation request submitted successfully!");
        setFormData({
          userName: "",
          userEmail: "",
          phone: "",
          date: "",
          region: "",
          location: "",
          carType: "",
          description: "",
          registrationNumber: "",
          driverContact: "",
        });
        setCarImages([]);
        setImagePreviews([]);
        navigate("/request-dashboard");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Request a Relocation</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Date */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Select Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Region */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select name="region" value={formData.region} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm">
            <option value="" disabled>Select a region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Car Type */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Car Type</label>
          <input type="text" name="carType" value={formData.carType} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Car Description */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Car Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Registration Number */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Driver Contact */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Driver Contact</label>
          <input type="text" name="driverContact" value={formData.driverContact} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-black transition duration-300">
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
