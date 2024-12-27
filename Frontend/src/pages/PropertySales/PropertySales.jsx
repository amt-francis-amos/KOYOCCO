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

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "photos") {
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...files],
      }));
    } else if (name === "video") {
      setFormData((prevData) => ({
        ...prevData,
        video: files[0],
      }));
    }
  };

  const handlePostListing = async () => {
    const { title, description, photos, video } = formData;

    // Validate inputs
    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    if (photos.length === 0) {
      alert("Please upload at least one photo.");
      return;
    }

    if (!video) {
      alert("Please upload a video.");
      return;
    }

    // Prepare data for submission
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("isPropertyOwner", isPropertyOwner);

    // Append photos to FormData
    Array.from(photos).forEach((photo) => formDataToSend.append("photos", photo));
    
    // Append video to FormData
    if (video) {
      formDataToSend.append("video", video);
    } else {
      alert("No video selected.");
      return;
    }

    // Log FormData after appending files to confirm
    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });

    // Log FormData content
    console.log("FormData being sent:", formDataToSend);

    try {
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/post-listing",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
};


  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-6">Post Property for Sale</h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPropertyOwner(true)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold mr-4 ${
              isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Property Owner
          </button>
          <button
            onClick={() => setIsPropertyOwner(false)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold ${
              !isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
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
              {formData.photos.length > 0 && (
                <ul className="mt-2">
                  {Array.from(formData.photos).map((photo, index) => (
                    <li key={index} className="text-gray-500">
                      {photo.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
              <input
                type="file"
                name="video"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
              />
              {formData.video && (
                <p className="mt-2 text-gray-500">Selected Video: {formData.video.name}</p>
              )}
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
              {formData.photos.length > 0 && (
                <ul className="mt-2">
                  {Array.from(formData.photos).map((photo, index) => (
                    <li key={index} className="text-gray-500">
                      {photo.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
              <input
                type="file"
                name="video"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleFileChange}
              />
              {formData.video && (
                <p className="mt-2 text-gray-500">Selected Video: {formData.video.name}</p>
              )}
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
