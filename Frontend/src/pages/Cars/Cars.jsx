import React from 'react'
import { carListings } from '../../assets/assets';

const Cars = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Cars for Sale</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carListings.map(car => (
                    <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{car.name}</h2>
                            <p className="text-gray-600">{car.location}</p>
                            <p className="text-lg font-bold mt-2">{car.price}</p>
                            <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-black">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Cars