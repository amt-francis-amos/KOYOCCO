import React, { useState } from "react";

const PropertySales = () => {
  const [isPropertyOwner, setIsPropertyOwner] = useState(true); 
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-6">Post Property for Sale</h1>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsPropertyOwner(true)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold mr-4 ${
              isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Property Owner
          </button>
          <button
            onClick={() => setIsPropertyOwner(false)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold ${
              !isPropertyOwner ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Agent (Rental)
          </button>
        </div>

        {isPropertyOwner ? (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Property Owner Post</h2>
            <p className="text-gray-600 mb-6">
              As a property owner, you can post your properties for sale. You are required to pay a small
              fee for promotion and visibility to potential buyers.
            </p>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property title"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property description"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Photos</label>
              <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" multiple />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
              <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Promotion Fee: <span className="text-green-500">$50</span>
              </h3>
              <button className="bg-red-500 text-white py-3 px-8 rounded-lg">
                Pay and Post Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Agent (Rental) Post</h2>
            <p className="text-gray-600 mb-6">
              As an agent, you can post rental properties. There is no additional fee for posting, and you can list as many properties as needed.
            </p>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property title"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter property description"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Photos</label>
              <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" multiple />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Video</label>
              <input type="file" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Monthly Subscription: <span className="text-green-500">$100/month</span>
              </h3>
              <button className="bg-red-500 text-white py-3 px-8 rounded-lg">
                Post Rental Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySales;
