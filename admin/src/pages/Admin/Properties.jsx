import React from "react";

const Properties = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700">Properties</h2>
        <div className="mt-4">
          {/* Display property listings in a table or grid format */}
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-left">Property Name</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through properties */}
              <tr>
                <td className="py-3 px-6">Luxury Villa</td>
                <td className="py-3 px-6">California</td>
                <td className="py-3 px-6">Available</td>
                <td className="py-3 px-6">Edit | Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Properties;
