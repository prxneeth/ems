import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-blue-500 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center ">Employee MS</h3>
      </div>
      <div className="flex flex-col gap-5">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center space-x-4  duration-300 py-2.5 px-4 rounded`
          }
          end
        >
          <i className="fa-solid fa-gauge-high"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center space-x-4 duration-300  py-2.5 px-4 rounded`
          }
        >
          <i className="fa-solid fa-users"></i>
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : ""
            } flex items-center space-x-4 duration-300  py-2.5 px-4 rounded`
          }
        >
          <i className="fa-solid fa-building"></i>
          <span>Department</span>
        </NavLink>

        <NavLink
          to=""
          className="flex items-center space-x-4  py-2.5 px-4 rounded"
        >
          <i className="fa-solid fa-calendar-days"></i>
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to=""
          className="flex items-center space-x-4  py-2.5 px-4 rounded"
        >
          <i className="fa-solid fa-sack-dollar"></i>
          <span>Salary</span>
        </NavLink>
        <NavLink
          to=" "
          className="flex items-center space-x-4  py-2.5 px-4 rounded"
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
