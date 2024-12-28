import React, { useState } from "react";
import axios from "axios";

const PropertySales = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    photos: [], // Actual file objects
    photoPreviews: [], // Previews of the files
    video: null, // Video file
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "photos") {
      const photoFiles = Array.from(files);
      const photoPreviews = photoFiles.map((file) => URL.createObjectURL(file));

      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...photoFiles], // Store files
        photoPreviews: [...prevData.photoPreviews, ...photoPreviews], // Store previews
      }));
    } else if (name === "video") {
      setFormData((prevData) => ({
        ...prevData,
        video: files[0], // Store the video file
      }));
    }
  };

  // Handle form submission
  const handlePostListing = async () => {
    const { name, description, location, price, photos, video } = formData;

    // Validate inputs
    if (!name || !description || !location || !price) {
      setError("Title, description, location, and price are required.");
      return;
    }

    if (photos.length === 0) {
      setError("Please upload at least one photo.");
      return;
    }

    if (!video) {
      setError("Please upload a video.");
      return;
    }

    setError(""); // Clear any previous errors

    // Prepare form data for upload
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("description", description);
    formDataToSend.append("location", location);
    formDataToSend.append("price", price);
    photos.forEach((photo) => formDataToSend.append("photos", photo));
    formDataToSend.append("video", video);

    try {
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/post-listing/upload",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSuccessMessage("Property uploaded successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Failed to upload property. Please try again.");
    }
  };

  // JSX Render
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-6">Post Property for Sale</h1>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Property Details</h2>

          {/* Error and Success Messages */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

          {/* Form Inputs */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Property Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Upload Photos */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Upload Photos</label>
            <input
              type="file"
              name="photos"
              multiple
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
            {/* Photo Previews */}
            {formData.photoPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.photoPreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upload Video */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handlePostListing}
              className="bg-red-500 text-white py-3 px-8 rounded-lg font-semibold"
            >
              Post Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySales;
