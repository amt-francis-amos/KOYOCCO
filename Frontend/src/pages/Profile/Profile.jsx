import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editable, setEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); 
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("https://koyocco-backend.onrender.com/api/User/profile", config);
        setProfileData(response.data);
      } catch (error) {
        setError("Failed to load profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [localStorage.getItem("authToken")]);

const handleSave = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      setUploading(true);
      const imageUploadResponse = await axios.post(
        "https://koyocco-backend.onrender.com/api/User/upload-profile-image",
        formData,
        config
      );
      setUploading(false);

      setProfileData((prevData) => ({
        ...prevData,
        profileImage: imageUploadResponse.data.profileImage,
      }));

      
    }

   
    const response = await axios.put(
      "https://koyocco-backend.onrender.com/api/User/profile",
      profileData,
      config
    );

    setMessage(response.data.message); 
    setEditable(false);
    setProfileData(response.data.user); 
  } catch (error) {
    setUploading(false);
    console.error("Error updating profile:", error);
  }
};


  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Profile</h1>

         
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer">
                <img
                  src={profileData.profileImage || assets.houseImg2}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onClick={() => document.getElementById("imageInput").click()}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                )}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profileData.firstname} {profileData.lastname}
                </h2>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            </div>

            <input
              id="imageInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />

          
            <div>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium">First Name:</label>
                <input
                  type="text"
                  value={profileData.firstname || ""}
                  onChange={(e) => setProfileData({ ...profileData, firstname: e.target.value })}
                  disabled={!editable}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium">Last Name:</label>
                <input
                  type="text"
                  value={profileData.lastname || ""}
                  onChange={(e) => setProfileData({ ...profileData, lastname: e.target.value })}
                  disabled={!editable}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium">Email:</label>
                <input
                  type="email"
                  value={profileData.email || ""}
                  disabled
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium">Phone Number:</label>
                <input
                  type="text"
                  value={profileData.phoneNumber || ""}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                  disabled={!editable}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium">Location:</label>
                <input
                  type="text"
                  value={profileData.location || ""}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  disabled={!editable}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setEditable(!editable)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {editable ? "Cancel" : "Edit"}
                </button>

                {editable && (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                )}
              </div>

              {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
