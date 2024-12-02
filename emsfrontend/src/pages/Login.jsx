import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1000/api/auth/login",
        { email, password }
      );

      if (response.data.success) {
        alert("successfully logged in");
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.log("error while logging in", error);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("server error");
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-gray-900 from-50% to-gray-200 to-50% space-y-6">
      <h1 className="font-mono ml-4  font-thin text-white">
        Employee Management System
      </h1>
      <div className="border shadow-lg shadow-black p-6 pr-12 rounded-lg lg:w-1/4 md:w-2/5 sm:w-1/2 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter your email "
              className="w-full px-3 py-2 border rounded-md "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="enter your password"
              required
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 ml-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 mr-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
          <div className="mb-4 ml-2 w-full flex justify-center">
            <button
              type="submit"
              className="w-full border-none rounded-lg flex justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 cursor-pointer "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
