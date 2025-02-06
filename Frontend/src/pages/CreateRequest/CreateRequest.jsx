import React, { useState } from "react";
import axios from "axios";
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

  const [carData, setCarData] = useState({
    carType: "",
    description: "",
    registrationNumber: "",
    location: "",
    region: "",
    driverContact: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes for both forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.form.name === "carForm") {
      setCarData({ ...carData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submitting relocation request
  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      } else {
        toast.error("Failed to submit request.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle submitting car details
  const handleSubmitCar = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://koyocco-backend.onrender.com/api/cars/upload-car", carData);
      if (response.status === 201) {
        toast.success("Car uploaded successfully!");
        setCarData({
          carType: "",
          description: "",
          registrationNumber: "",
          location: "",
          region: "",
          driverContact: "",
        });
      } else {
        toast.error("Failed to upload car.");
      }
    } catch (error) {
      toast.error("An error occurred while uploading the car.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Relocation Request Form */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Request a Relocation</h1>
        <form onSubmit={handleSubmitRequest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add your form fields here */}
          <div className="col-span-2 flex justify-center mt-4">
            <button type="submit" disabled={isSubmitting} className="w-full md:w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-300">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>

      {/* Car Upload Form */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Your Car</h1>
        <form name="carForm" onSubmit={handleSubmitCar} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Car Type</label>
            <input type="text" name="carType" value={carData.carType} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Car Description</label>
            <textarea name="description" value={carData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm" rows="3"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input type="text" name="registrationNumber" value={carData.registrationNumber} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={carData.location} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <input type="text" name="region" value={carData.region} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Driver Contact Info</label>
            <input type="text" name="driverContact" value={carData.driverContact} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm" />
          </div>
          <div className="col-span-2 flex justify-center mt-4">
            <button type="submit" disabled={isSubmitting} className="w-full md:w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-300">
              {isSubmitting ? "Uploading..." : "Upload Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
