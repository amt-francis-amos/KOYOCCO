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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
  
    // Debugging log to check form data
    console.log("Form Data Before Submission:", formData);
    console.log("Car Images:", carImages);
  
    if (
      !formData.userName ||
      !formData.userEmail ||
      !formData.phone ||
      !formData.serviceType ||
      !formData.date ||
      !formData.location ||
      !formData.carType ||
      !formData.description ||
      !formData.registrationNumber ||
      !formData.region ||
      !formData.driverContact ||
      carImages.length === 0
    ) {
      toast.error("Please fill in all fields and upload at least one image.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
  
      carImages.forEach((image) => {
        formDataToSend.append("carImages", image);
      });
  
      console.log("Submitting Data to API...");
  
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/requests/create",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      console.log("Server Response:", response);
  
      if (response.status === 201) {
        toast.success("Relocation request submitted successfully!");
        setFormData({
          userName: "", userEmail: "", phone: "", serviceType: "relocation", details: "", date: "",
          location: "", carType: "", description: "", registrationNumber: "", region: "", driverContact: "",
        });
        setCarImages([]);
        setImagePreviews([]);
        navigate("/request-dashboard");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred while submitting the request.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 mb-8 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Request a Relocation</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Car Type</label>
          <input type="text" name="carType" value={formData.carType} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select name="region" value={formData.region} onChange={handleChange} required className="w-full p-2 border rounded-md shadow-sm">
            <option value="">Select a region</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Car Images (Max: 5)</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="w-full p-2 border rounded-md shadow-sm" />
        </div>

        {imagePreviews.length > 0 && (
          <div className="sm:col-span-2 flex flex-wrap gap-4 mt-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={preview} alt={`preview-${index}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs">X</button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-black transition duration-300">
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
