import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import logoImg from '../../assets/koyocco-logo.jpeg'; 
import RoleModal from '../../components/Modals/RoleModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://koyocco-backend.onrender.com/api/auth/signup', {
        email,
        password,
        role,
        firstname,
        lastname,
        phoneNumber,
        location,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
  
      if (response.status === 201) {
        toast.success('Signup successful!'); 
        navigate('/login');
      } else {
        setMessage('Unexpected response from server');
      }
    } catch (error) {
      console.log(error); 
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };
  
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      {showModal && <RoleModal setRole={setRole} closeModal={closeModal} />}
      {!showModal && !isLoggedIn && (
        <div className="bg-white m-[40px] shadow-md rounded-lg p-8 max-w-[500px] w-full mx-auto">
          <img src={logoImg} alt="Logo" className="mx-auto mb-6" style={{ width: '80px', height: '80px' }} />
          <h1 className="text-3xl font-bold mb-6 text-center">Signup as {role}</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            {/* Other form fields */}
            <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
              Sign Up
            </button>
          </form>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Signup;
