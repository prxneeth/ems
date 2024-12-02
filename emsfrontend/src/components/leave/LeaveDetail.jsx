import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveDetail = () => {
  const [leave, setLeave] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      if (!id) {
        alert("Employee ID is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:1000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
          console.log("fdasfirst", response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      {leave ? (
        <div className="flex flex-col md:flex-row items-center  md:items-start space-y-6 space-x-10 md:space-y-0">
          <div className="flex justify-center md:w-1/3">
            <img
              src={`http://localhost:1000/${leave.employeeId.userId.profileImage}`}
              alt="Profile"
              className="w-72 h-72 rounded-md border-4 border-blue-600 shadow-xl p-1 mt-10"
            />
          </div>

          <div className="md:w-2/3 space-y-3">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center md:text-left mb-4">
              Leave Details
            </h2>

            <div className="flex items-center space-x-2">
              <p className="text-xl font-medium text-gray-700">Name:</p>
              <p className="text-xl text-gray-900">
                {leave.employeeId.userId.name}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Employee ID:</p>
              <p className="text-xl text-gray-900">
                {leave.employeeId.employeeId}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Leave Type</p>
              <p className="text-xl text-gray-900">{leave.leaveType}</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Reason:</p>
              <p className="text-xl text-gray-900">{leave.reason}</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Department:</p>
              <p className="text-xl text-gray-900">
                {leave.employeeId.department?.dep_name}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">Start Date :</p>
              <p className="text-xl text-gray-900">
                {new Date(leave.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">End Date :</p>
              <p className="text-xl text-gray-900">
                {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xl font-medium text-gray-700">
                {leave.status === "Pending" ? "Action :" : "Status :"}
              </p>
              {leave.status === "Pending" ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => changeStatus(leave._id, "Approved")}
                    className="border-none py-1 px-4 bg-green-500 hover:bg-green-600 rounded-md m-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => changeStatus(leave._id, "Rejected")}
                    className="border-none py-1 px-4 bg-red-500 hover:bg-red-600 rounded-md m-1"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="text-xl text-gray-900">{leave.status}</p>
              )}
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

export default LeaveDetail;
