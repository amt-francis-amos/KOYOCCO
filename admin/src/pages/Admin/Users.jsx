import React from "react";

const Users = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div className=" w-[100%] h-[100vh] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700">Users</h2>
        <div className="mt-4">
          {/* Display users in a table */}
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through users */}
              <tr>
                <td className="py-3 px-6">John Doe</td>
                <td className="py-3 px-6">john@example.com</td>
                <td className="py-3 px-6">Admin</td>
                <td className="py-3 px-6">Edit | Delete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
