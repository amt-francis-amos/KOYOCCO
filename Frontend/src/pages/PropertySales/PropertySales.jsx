import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PropertySales = () => {
  const [isPropertyOwner, setIsPropertyOwner] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    images: [],
    video: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prevData) => ({
        ...prevData,
        images: files ? Array.from(files) : [],
      }));
    } else if (name === "video") {
      setFormData((prevData) => ({
        ...prevData,
        video: files ? files[0] : null,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, description, location, price, images, video } = formData;
  
    // Validate inputs
    if (!name || !description || !location || !price) {
      setMessage("Title, description, location, and price are required.");
      toast.error("Title, description, location, and price are required.");
      return;
    }
  
    if (images.length === 0) {
      setMessage("Please upload at least one photo.");
      toast.error("Please upload at least one photo.");
      return;
    }
  
    if (!video) {
      setMessage("Please upload a video.");
      toast.error("Please upload a video.");
      return;
    }
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      } else if (key === "video") {
        formDataToSend.append("video", video);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      console.log("Sending data to the server...");
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/post-listing/upload",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Server response:", response.data);
      if (response.status === 200) {
        toast.success("Property uploaded successfully!");
        setMessage("Property uploaded successfully!");
        setFormData({
          name: "",
          description: "",
          location: "",
          price: "",
          images: [],
          video: null,
        });
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error uploading property:", error);
      if (error.response) {
        console.error("Server response data:", error.response.data);
        toast.error(
          `Failed to upload property: ${error.response.data.message || "Please try again."}`
        );
      } else {
        toast.error("Failed to upload property. Please check your network or try again later.");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <ToastContainer />
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

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isPropertyOwner ? "Property Owner Post" : "Agent (Rental) Post"}
          </h2>

          {message && <div className="text-red-500 text-center mb-4">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Property Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property title"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Images</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              {formData.images.length > 0 && (
                <ul className="mt-2">
                  {formData.images.map((image, index) => (
                    <li key={index} className="text-gray-500">{image.name}</li>
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
                onChange={handleChange}
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
                  <button type="submit" className="bg-red-500 text-white py-3 px-8 rounded-lg">
                    Pay and Post Property
                  </button>
                </>
              ) : (
                <button type="submit" className="bg-red-500 text-white py-3 px-8 rounded-lg">
                  Post Property
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertySales;
