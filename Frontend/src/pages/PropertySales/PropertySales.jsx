import React, { useState } from "react";
import axios from "axios";

const PropertySales = () => {

  const [isPropertyOwner, setIsPropertyOwner] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photos: [],
    video: null,
  });

  const handleFileChange = async (e) => {
    const { name, files } = e.target;

 
    if (name === "photos") {
      const uploadedPhotos = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formDataToSend = new FormData();
        formDataToSend.append("file", file);
        formDataToSend.append("upload_preset", "ml_default");

        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/CLOUDINARY_CLOUD_NAME/image/upload",
            formDataToSend
          );
          uploadedPhotos.push(response.data.secure_url);
        } catch (error) {
          console.error("Error uploading photo to Cloudinary:", error);
        }
      }
      setFormData({ ...formData, photos: uploadedPhotos });
    } else if (name === "video") {
     
      const file = files[0];
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("upload_preset", "CLOUDINARY_UPLOAD_PRESET");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/CLOUDINARY_CLOUD_NAME/video/upload",
          formDataToSend
        );
        setFormData({ ...formData, video: response.data.secure_url });
      } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
      }
    }
  };

  const handlePostListing = async () => {
    const { title, description, photos, video } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('description', description);

    photos.forEach((photo) => formDataToSend.append('photos', photo));
    formDataToSend.append('video', video);
    formDataToSend.append('isPropertyOwner', isPropertyOwner);
  
    try {
      const response = await axios.post(
        'https://koyocco-backend.onrender.com/api/post-listing',
        formDataToSend
      );
      console.log('Response:', response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.log('Response Error:', error.response.data);
        alert(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        console.log('No Response:', error.request);
        alert('No response received from the server.');
      } else {
        console.log('Request Error:', error.message);
        alert(`Request Error: ${error.message}`);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-6">Post Property for Sale</h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPropertyOwner(true)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold mr-4 ${isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"}`}
          >
            Property Owner
          </button>
          <button
            onClick={() => setIsPropertyOwner(false)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold ${!isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"}`}
          >
            Agent (Rental)
          </button>
        </div>

        {isPropertyOwner ? (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Property Owner Post</h2>
            <p className="text-gray-600 mb-6">
              As a property owner, you can post your properties for sale. You are required to pay a small fee for promotion and visibility to potential buyers.
            </p>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Photos</label>
              <input
                type="file"
                name="photos"
                multiple
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
              <input
                type="file"
                name="video"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Promotion Fee: <span className="text-green-500">$50</span>
              </h3>
              <button onClick={handlePostListing} className="bg-red-500 text-white py-3 px-8 rounded-lg">
                Pay and Post Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Agent (Rental) Post</h2>
            <p className="text-gray-600 mb-6">
              As an agent, you can post rental properties. There is no additional fee for posting, and you can list as many properties as needed.
            </p>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Photos</label>
              <input
                type="file"
                name="photos"
                multiple
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
              <input
                type="file"
                name="video"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
              />
            </div>

            <div className="text-center">
              <button onClick={handlePostListing} className="bg-red-500 text-white py-3 px-8 rounded-lg">
                Post Rental Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySales;