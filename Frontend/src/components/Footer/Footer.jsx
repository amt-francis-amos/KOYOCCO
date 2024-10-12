import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import logoImg from '../../assets/koyocco-logo.jpeg';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-[100px] ">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <img src={logoImg} alt="Logo" className="h-12 mb-5" />
          <p className="text-gray-400 text-[14px]">With Koyocco, our platform is designed to make finding and renting a property easy and hassle-free for everyone involved. You can streamline the entire real estate transaction process from start to finish. KOYOCCO!!! YOUR NEXT LEVEL OF HAPPINESS</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <div className="h-1 bg-red-500 w-24 mb-4"></div>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white block">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white block">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white block">Services</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white block">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Contact</h2>
          <div className="h-1 bg-red-500 w-24 mb-4"></div>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Amarh Tettey Street, Ashaiman, Valco Flat
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <a href="mailto:info@koyocco.com" className="hover:text-white">info@koyocco.com</a>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              +233-241-333-361
            </li>
            <li className="flex items-center">
              <FaGlobe className="mr-2" />
              <a href="http://www.koyocco.com" className="hover:text-white">www.koyocco.com</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Follow Us</h2>
          <div className="h-1 bg-red-500 w-24 mb-4"></div>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 border-t border-gray-700 pt-4">
      &copy; {new Date().getFullYear()} Koyocco Gh. All rights reserved | Designed By SugarMedia Ltd | 0541742099.
      </div>
    </div>
  </footer>
);

export default Footer;
