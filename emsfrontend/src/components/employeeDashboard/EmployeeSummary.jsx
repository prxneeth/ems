import React from "react";
import { useAuth } from "../../context/authContext";

const EmployeeSummary = () => {
  const { user } = useAuth();
  return (
    <div className=" rounded-md flex text-white bg-gray-800 m-3 ">
      <div
        className={`text-3xl flex justify-center items-center bg-blue-500 text-white px-4 rounded-md`}
      >
        <i className="fa-solid fa-users"></i>
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-light">Welcome Back</p>
        <p className="text-xl font-bold">{user.name}</p>
      </div>
    </div>
  );
};

export default EmployeeSummary;
