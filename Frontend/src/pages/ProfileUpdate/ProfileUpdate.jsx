import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    location: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:5000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setUser(response.data);
      setFormData({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        phoneNumber: response.data.phoneNumber,
        location: response.data.location
      });
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    axios.put('http://localhost:5000/api/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      alert('Profile updated successfully');
      setUser(response.data.user);
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
    });
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
