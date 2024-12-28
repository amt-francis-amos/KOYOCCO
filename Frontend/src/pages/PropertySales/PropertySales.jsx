import React, { useState } from "react";
import axios from "axios";

const PropertySales = () => {


  const [isPropertyOwner, setIsPropertyOwner] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",  
    price: "",     
    photos: [],
    video: null,
  });


  const [error, setError] = useState("");

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

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("description", description);
    formDataToSend.append("location", location); 
    formDataToSend.append("price", price);        
    formDataToSend.append("photos", photos);
    formDataToSend.append("video", video);

    try {
      const response = await axios.post("https://koyocco-backend.onrender.com/api/post-listing/upload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Property uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading property:", error);
      setError("Failed to upload property. Please try again.");
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

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">{isPropertyOwner ? "Property Owner Post" : "Agent (Rental) Post"}</h2>
          <p className="text-gray-600 mb-6">
            {isPropertyOwner
              ? "As a property owner, you can post your properties for sale. You are required to pay a small fee for promotion and visibility to potential buyers."
              : "As an agent, you can post rental properties. There is no additional fee for posting, and you can list as many properties as needed."}
          </p>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Property Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property title"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

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
            {formData.photos.length > 0 && (
              <ul className="mt-2">
                {Array.from(formData.photos).map((photo, index) => (
                  <li key={index} className="text-gray-500">{photo.name}</li>
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
            {isPropertyOwner ? (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Promotion Fee: <span className="text-green-500">$50</span>
                </h3>
                <button onClick={handlePostListing} className="bg-red-500 text-white py-3 px-8 rounded-lg">
                  Pay and Post Property
                </button>
              </>
            ) : (
              <button onClick={handlePostListing} className="bg-red-500 text-white py-3 px-8 rounded-lg">
                Post Property
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySales;
