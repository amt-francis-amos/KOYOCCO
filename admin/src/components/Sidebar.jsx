import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          {/* Dashboard */}
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500' : ''
              }`
            }
          >
         
            <p>Dashboard</p>
          </NavLink>

          {/* Property Management */}
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500' : ''
              }`
            }
          >
         
            <p>Properties</p>
          </NavLink>
          <NavLink
            to="/add-property"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500' : ''
              }`
            }
          >
         
            <p>Add Property</p>
          </NavLink>

          {/* User Management */}
          <NavLink
            to="/user-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500' : ''
              }`
            }
          >
      
            <p>Users</p>
          </NavLink>
          <NavLink
            to="/agent-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500' : ''
              }`
            }
          >
            <p>Agents List</p>
          </NavLink>

          {/* Booking Management */}
          <NavLink
            to="/all-bookings"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-red-500' : ''
              }`
            }
          >
           
            <p>All Bookings</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
