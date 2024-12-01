import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !setting.oldPassword ||
      !setting.newPassword ||
      !setting.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (setting.newPassword !== setting.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:1000/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
        setError("");
      } else {
        setError("An error occurred while changing the password.");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 w-96 shadow-lg shadow-black p-6 pr-12 rounded-lg lg:w-1/4 md:w-2/5 sm:w-1/2 bg-white">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <p className="text-red-500">{error}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              id="email"
              name="oldPassword"
              value={setting.oldPassword}
              placeholder="change password"
              className="mt-1  w-full p-2 px-3 py-2 border rounded-md "
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="new password"
              value={setting.newPassword}
              required
              className="mt-1 w-full p-2 px-3 py-2 border rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={setting.confirmPassword}
              required
              className="mt-1 w-full p-2 px-3 py-2 border rounded-md"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 ml-2 w-full flex justify-center">
            <button
              type="submit"
              className="w-full border-none rounded-lg flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 cursor-pointer "
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
