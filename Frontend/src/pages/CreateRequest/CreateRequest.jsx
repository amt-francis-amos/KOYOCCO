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

  const [carImages, setCarImages] = useState([]); // Store multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Store preview URLs
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    if (files.length + carImages.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    // Store files and generate preview URLs
    setCarImages([...carImages, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  // Remove image from selection
  const handleRemoveImage = (index) => {
    const newImages = [...carImages];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setCarImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.userName || !formData.userEmail || !formData.phone || !formData.serviceType || !formData.date || !formData.location || !formData.carType || !formData.description || !formData.registrationNumber || !formData.region || !formData.driverContact || carImages.length === 0) {
      toast.error("Please fill in all fields and upload at least one image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append each image to formData
      carImages.forEach((image) => {
        formDataToSend.append("carImages", image);
      });

      const response = await axios.post("https://koyocco-backend.onrender.com/api/requests/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
        setCarImages([]);
        setImagePreviews([]);
        navigate("/request-dashboard");
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
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md outline-none shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md outline-none shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm outline-none" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Car Type</label>
          <input type="text" name="carType" value={formData.carType} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm outline-none" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Car Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border rounded-md shadow-sm outline-none" rows="3"></textarea>
        </div>

        {/* Image Upload Section */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Car Images (Max: 5)</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="mt-1 block w-full p-2 border rounded-md shadow-sm" />
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="col-span-2 flex flex-wrap gap-4 mt-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`preview-${index}`} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="col-span-2 flex justify-center mt-4">
          <button type="submit" disabled={isSubmitting} className="w-full md:w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black outline-none transition duration-300">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
