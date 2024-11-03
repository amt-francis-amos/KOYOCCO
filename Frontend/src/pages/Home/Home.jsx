import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { assets } from '../../assets/assets';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

const Home = () => {

  
  return (
    <div>
      <header className="h-screen">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
        >
          {[assets.houseImg1, assets.houseImg2, assets.houseImg3].map((img, index) => (
            <div key={index} className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${img})` }}>
              <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
                <p className="text-white text-lg md:text-xl mb-8">Browse through the best properties available.</p>
                <Link to="/propertyList" className="bg-red-500 text-white px-6 py-3 rounded-md">Get Started</Link>
              </div>
            </div>
          ))}
        </Carousel>
      </header>

      <div className="container mx-auto my-8 px-4">

        <section className="my-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
