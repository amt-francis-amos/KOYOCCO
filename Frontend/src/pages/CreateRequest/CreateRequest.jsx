import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phone: "",
    serviceType: "relocation",
    details: "",
    date: "",
    location: "",
    carType: "",
    description: "",
    registrationNumber: "",
    region: "",
    driverContact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const regions = [
    "Ahafo",
    "Ashanti",
    "Bono",
    "Bono East",
    "Central",
    "Eastern",
    "Greater Accra",
    "North East",
    "Northern",
    "Oti",
    "Savannah",
    "Upper East",
    "Upper West",
    "Volta",
    "Western",
    "Western North",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { userName, userEmail, phone, serviceType, date, location, carType, description, registrationNumber, region, driverContact } = formData;

    if (!userName || !userEmail || !phone || !serviceType || !date || !location || !carType || !description || !registrationNumber || !region || !driverContact) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("https://koyocco-backend.onrender.com/api/requests/create", formData);

      if (response.status === 201) {
        toast.success("Relocation request submitted successfully!");
        setFormData({
          userName: "",
          userEmail: "",
          phone: "",
          serviceType: "relocation",
          details: "",
          date: "",
          location: "",
          carType: "",
          description: "",
          registrationNumber: "",
          region: "",
          driverContact: "",
        });

        navigate("/cars");
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Request a Relocation</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Car Type</label>
          <input type="text" name="carType" value={formData.carType} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Car Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" rows="3"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select name="region" value={formData.region} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300">
            <option value="">Select a Region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Driver Contact Info</label>
          <input type="text" name="driverContact" value={formData.driverContact} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300" />
        </div>
        <div className="col-span-2 flex justify-center mt-4">
          <button type="submit" disabled={isSubmitting} className="w-full md:w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-300">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
