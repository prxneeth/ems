import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const List = () => {
  let sno = 1;
  const { user } = useAuth();

  const [leaves, setleaves] = useState(null);

  const { id } = useParams();
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setleaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div>loading</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="search by dep name"
          className="px-4 py-1 border"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="bg-blue-500 rounded-md hover:bg-blue-600 py-1 px-4"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-5 ">
        <thead className="text-xs text-gray-700 uppercase bg-blue-500 border border-gray-300 ">
          <tr>
            <th className="px-6 py-3"> SNO</th>
            <th className="px-6 py-3"> Leave Type</th>
            <th className="px-6 py-3"> From</th>
            <th className="px-6 py-3"> To</th>
            <th className="px-6 py-3"> Description</th>

            <th className="px-6 py-3"> Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, i) => (
            <tr
              key={i}
              className="bg-white border  text-white dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>

              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
