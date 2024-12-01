import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex  items-center text-white justify-between px-3 h-12 bg-blue-500">
      <p className="">Welcome {user.name} </p>
      <button
        onClick={() => logout()}
        className="px-4 py-1 bg-blue-200 hover:bg-blue-300 border-none cursor-pointer rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
