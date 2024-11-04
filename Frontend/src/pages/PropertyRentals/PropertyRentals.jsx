import React from 'react'
import { featuredProperties } from '../../assets/assets'

const PropertyRentals = () => {
  return (
    <div className="max-w-[1200px] mx-auto py-6 sm:py-12">
    <h1 className="text-3xl font-bold text-center mb-8">Property Rentals</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProperties.map((feature) => (
        <div
          key={feature.id}
          className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col"
        >
          <img
            src={feature.image}
            alt={feature.name}
            className="w-full h-48 sm:h-60 object-cover mb-4"
          />
          <div className="flex-grow">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{feature.name}</h2>
            <p className="text-gray-600">{feature.location}</p>
            <p className="text-gray-800 font-bold text-lg mt-1">{feature.price}</p>
          </div>
          <button
            onClick={() => handleBooking(feature)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
          >
            Rent Now
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default PropertyRentals