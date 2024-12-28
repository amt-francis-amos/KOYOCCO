import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editable, setEditable] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("/api/user/profile", config);
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
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

      const response = await axios.put("/api/user/profile", profileData, config);
      setMessage(response.data.message);
      setEditable(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={profileData.firstname || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, firstname: e.target.value })
          }
          disabled={!editable}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={profileData.lastname || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, lastname: e.target.value })
          }
          disabled={!editable}
        />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={profileData.email || ""} disabled />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={profileData.phoneNumber || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, phoneNumber: e.target.value })
          }
          disabled={!editable}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={profileData.location || ""}
          onChange={(e) =>
            setProfileData({ ...profileData, location: e.target.value })
          }
          disabled={!editable}
        />
      </div>
      <button onClick={() => setEditable(!editable)}>
        {editable ? "Cancel" : "Edit"}
      </button>
      {editable && <button onClick={handleSave}>Save</button>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
