import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        alert("Employee ID is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:1000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      {employee && employee.userId ? (
        <div className="flex flex-col md:flex-row items-center  md:items-start space-y-6 space-x-10 md:space-y-0">
          <div className="flex justify-center md:w-1/3">
            <img
              src={`http://localhost:1000/${employee.userId.profileImage}`}
              alt="Profile"
              className="w-72 h-72 rounded-md border-4 border-blue-600 shadow-xl p-1 mt-10"
            />
          </div>

          <div className="md:w-2/3 space-y-5">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center md:text-left mb-4">
              Employee Details
            </h2>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Name:</p>
              <p className="text-xl text-gray-900">{employee.userId.name}</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Employee ID:</p>
              <p className="text-xl text-gray-900">{employee.employeeId}</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">
                Date of Birth:
              </p>
              <p className="text-xl text-gray-900">
                {new Date(employee.dob).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Gender:</p>
              <p className="text-xl text-gray-900">{employee.gender}</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Department:</p>
              <p className="text-xl text-gray-900">
                {employee.department?.dep_name}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">
                Marital Status:
              </p>
              <p className="text-xl text-gray-900">{employee.maritalStatus}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">
          Loading employee details...
        </p>
      )}
    </div>
  );
};

export default ViewEmployee;
