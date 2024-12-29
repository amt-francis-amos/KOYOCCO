import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editable, setEditable] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
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
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.put(
        "https://koyocco-backend.onrender.com/api/User/profile",
        profileData, // Profile data to update
        config
      );
  
      setMessage(response.data.message); // Success message
      setEditable(false);
      setProfileData(response.data.user); // Update profile with new data
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
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
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Your Profile
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer">
                <img
                  src={profileData.profileImage || assets.houseImg2}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onClick={() => document.getElementById("imageInput").click()}
                />
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
              onChange={handleImageChange}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData.phoneNumber || ""}
                  disabled={!editable}
                  onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={profileData.location || ""}
                  disabled={!editable}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              </div>
            </div>

            {message && <p className="text-green-500 text-center mt-4">{message}</p>}

            <div className="flex justify-center mt-6 space-x-4">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setEditable(!editable)}
              >
                {editable ? "Cancel" : "Edit"}
              </button>
              {editable && (
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
