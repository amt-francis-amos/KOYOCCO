import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.dashboard_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          {/* Property Management */}
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.property_icon} alt="" />
            <p>Properties</p>
          </NavLink>
          <NavLink
            to="/add-property"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.add_property_icon} alt="" />
            <p>Add Property</p>
          </NavLink>

          {/* User Management */}
          <NavLink
            to="/user-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.users_icon} alt="" />
            <p>Users</p>
          </NavLink>
          <NavLink
            to="/agent-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.agent_icon} alt="" />
            <p>Agents</p>
          </NavLink>

          {/* Payment Management */}
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.payment_icon} alt="" />
            <p>Payments</p>
          </NavLink>

          {/* Reports */}
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.reports_icon} alt="" />
            <p>Reports</p>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''
              }`
            }
          >
            <img src={assets.settings_icon} alt="" />
            <p>Settings</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
