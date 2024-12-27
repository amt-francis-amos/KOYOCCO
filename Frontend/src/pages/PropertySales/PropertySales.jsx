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
    const { title, description, photos, video } = formData;

    // Validate inputs
    if (!title || !description) {
      setError("Title and description are required.");
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

    // Upload photos to Cloudinary
    const photoUploadPromises = Array.from(photos).map((photo) => {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Use .env variable for preset
      formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME); // Use .env variable for cloud name

      return axios
        .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
        .then((response) => response.data.secure_url)
        .catch((error) => {
          setError("Error uploading photo: " + error.message);
          console.error("Error uploading photo: ", error);
        });
    });

    // Upload video to Cloudinary
    const videoUploadPromise = new Promise((resolve, reject) => {
      if (video) {
        const formData = new FormData();
        formData.append("file", video);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Use .env variable for preset
        formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME); // Use .env variable for cloud name

        axios
          .post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`, formData)
          .then((response) => resolve(response.data.secure_url))
          .catch((error) => reject("Error uploading video: " + error.message));
      } else {
        resolve(null);
      }
    });

    try {
      const photoUrls = await Promise.all(photoUploadPromises);
      const videoUrl = await videoUploadPromise;

      // Prepare the data for backend
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("description", description);
      formDataToSend.append("photos", JSON.stringify(photoUrls)); // Send as JSON array
      formDataToSend.append("video", videoUrl || ""); // Send video URL or empty string if no video

      // Send to the backend
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/post-listing",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      setError(""); // Clear error message after successful post
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
      console.error("Error:", error);
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
          <h2 className="text-2xl font-semibold mb-4">
            {isPropertyOwner ? "Property Owner Post" : "Agent (Rental) Post"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isPropertyOwner
              ? "As a property owner, you can post properties available for sale."
              : "As an agent, you can post rental properties on behalf of the owners."}
          </p>

          <div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border rounded-lg mt-2"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                value={formData.title}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Description</label>
              <textarea
                name="description"
                className="w-full p-3 border rounded-lg mt-2"
                rows="4"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                value={formData.description}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Upload Photos</label>
              <input
                type="file"
                name="photos"
                className="w-full p-3 border rounded-lg mt-2"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Upload Video</label>
              <input
                type="file"
                name="video"
                className="w-full p-3 border rounded-lg mt-2"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4">
              <button
                onClick={handlePostListing}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg"
              >
                Post Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySales;
