import React, { useState } from "react";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className=" container mx-auto flex justify-center bg-white items-center min-h-screen p-6">
      <div className="w-[80%] shadow-md rounded-lg p-6  ">
        <h2 className="text-2xl font-semibold text-gray-700">Add New Property</h2>
        <form className=" space-y-2 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600">Property Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Location</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-600">Price</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div>
            <button className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-black transition duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
