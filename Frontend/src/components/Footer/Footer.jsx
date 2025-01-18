import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-[100px] ">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <Link to="/"><img src={assets.koyoccoLogo} alt="Logo" className="h-12 mb-5" /></Link>
          <p className="text-gray-400 text-[14px]">With Koyocco, our platform is designed to make finding and renting a property easy and hassle-free for everyone involved. You can streamline the entire real estate transaction process from start to finish. KOYOCCO!!! YOUR NEXT LEVEL OF HAPPINESS</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <div className="h-1 bg-red-500 w-24 mb-4"></div>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white block">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white block">About Us</Link></li>
            <li><Link to="/short-stays" className="text-gray-400 hover:text-white block">Short Stay</Link></li>
            <li><Link to="/property-status" className="text-gray-400 hover:text-white block">Update Properties</Link></li>
            
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
              <a href="mailto:koyoccoincltd@gmail.com
" className="hover:text-white">koyoccoincltd@gmail.com
</a>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              +233-241-333-361
            </li>
            <li className="flex items-center">
              <FaGlobe className="mr-2" />
              <a href="http://www.koyoco.com" className="hover:text-white">www.koyoco.com</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Follow Us</h2>
          <div className="h-1 bg-red-500 w-24 mb-4"></div>
          <div className="flex justify-center lg:justify-start space-x-4">
            <a href="https://www.facebook.com/" target="_blank" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://x.com/home" target="_blank" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/koyocco_inc/profilecard/?igsh=MWN1d20xOW9rd2U0Ng=="  target="_blank" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/koyocco-real-estate-ltd-b01440244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" className="text-gray-400 hover:text-white">
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
