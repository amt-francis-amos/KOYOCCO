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
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

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
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

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
          <p className="text-gray-600 mb-6">
            {isPropertyOwner
              ? "As a property owner, you can post your properties for sale. You are required to pay a small fee for promotion and visibility to potential buyers."
              : "As an agent, you can post rental properties. There is no additional fee for posting, and you can list as many properties as needed."}
          </p>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

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
