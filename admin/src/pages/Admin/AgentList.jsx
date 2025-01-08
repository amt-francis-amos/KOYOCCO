import React from "react";

const AgentList = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700">Agents List</h2>
        <div className="mt-4">
          {/* Display agents in a table */}
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-left">Agent Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through agents */}
              <tr>
                <td className="py-3 px-6">Jane Smith</td>
                <td className="py-3 px-6">jane@example.com</td>
                <td className="py-3 px-6">Active</td>
                <td className="py-3 px-6">Edit | Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
