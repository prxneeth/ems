import React from "react";
import EmployeeSide from "../components/employeeDashboard/EmployeeSide";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      <EmployeeSide />
      <div className="flex-1 ml-64 bg-gray-200 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
