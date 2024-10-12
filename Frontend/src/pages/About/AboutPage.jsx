import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import { assets } from '../../assets/assets'; 

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section
        className="relative w-full h-[480px] bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.aboutImg})` }} 
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <div className="flex space-x-4">
            <Link to="/" className="text-lg hover:underline">HOME</Link>
            <span>|</span>
            <Link to="/about" className="text-lg font-semibold hover:underline">ABOUT</Link>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 flex-grow flex flex-col items-center py-12 px-6">
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={assets.houseImg3} 
                alt="Real Estate Team"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-xl md:text-2xl font-semibold text-center sm:text-center lg:text-left text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Koyocco Ghana, our mission is to provide exceptional real estate services through innovation, expertise, and a genuine passion for our clients. We strive to exceed expectations and deliver results that truly make a difference.
              </p>
              <p className="text-gray-700 mb-4">
                Our dedicated team of professionals brings years of experience and a deep understanding of the market to help you navigate the complexities of buying, selling, and renting properties. We are committed to ensuring a smooth and successful experience for every client we serve.
              </p>
              <p className="text-gray-700">
                Thank you for considering Koyocco Ghana as your real estate partner. We look forward to helping you achieve your real estate goals.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">Our History</h2>
          <p className="text-gray-700 mb-4 max-w-[900px] mx-auto text-center">
            Established in 2022, Koyocco Ghana has been at the forefront of the real estate industry, providing top-notch services to our clients. Over the years, we have expanded our services and built a reputation for excellence and integrity.
          </p>
        </section>

        <section
          className="container mx-auto px-4 mb-12 relative bg-cover bg-center py-12"
          style={{ backgroundImage: `url(${assets.aboutImg})` }}
        >
          <div className="absolute inset-0 bg-red-600 opacity-50"></div>
          <div className="relative z-10 text-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Contact Information</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full mb-2">
                    <FaMapMarkerAlt />
                  </div>
                  <h3 className="text-lg font-semibold">Address</h3>
                  <p>Amarh Tettey Street, Ashaiman, Valco Flat</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full mb-2">
                    <FaEnvelope />
                  </div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p><a href="mailto:info@koyocco.com" className="text-white hover:underline">info@koyocco.com</a></p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full mb-2">
                    <FaPhoneAlt />
                  </div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p>+233-241-333-361</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full mb-2">
                    <FaGlobe />
                  </div>
                  <h3 className="text-lg font-semibold">Website</h3>
                  <p><a href="http://www.koyocco.com" className="text-white hover:underline">www.koyocco.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">Follow Us</h2>
          <div className="flex justify-center space-x-6 text-gray-700">
            <a href="https://www.facebook.com" className="text-2xl hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" className="text-2xl hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="text-2xl hover:text-pink-600">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" className="text-2xl hover:text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="text-center">
            <Link to="/contact" className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-black transition duration-300">Get in Touch</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
