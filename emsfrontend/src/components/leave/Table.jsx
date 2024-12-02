import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { columns, LeaveButtons } from "../../pages/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  console.log("rst", leaves);
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/leave", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data);

        if (response.data.success && Array.isArray(response.data.leaves)) {
          const data = response.data.leaves.map((leave, index) => ({
            _id: leave._id,
            sno: index + 1,
            employeeId: leave.employeeId?.employeeId || "N/A",
            name: leave.employeeId?.userId?.name || "N/A",
            leaveType: leave.leaveType || "N/A",
            department: leave.employeeId?.department?.dep_name || "N/A",
            days:
              (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24),
            status: leave.status || "N/A",
            action: <LeaveButtons Id={leave._id} />,
          }));
          setLeaves(data);
          setFilteredLeaves(data);
        } else {
          console.error("Invalid data structure or no data returned");
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  return (
    <>
      {filteredLeaves ? (
        <div className="p-3">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="search by Emp Id"
              className="px-4 py-1 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              {" "}
              <button
                onClick={() => filterByButton("Pending")}
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 border-none cursor-pointer rounded-md"
              >
                Pending
              </button>
              <button
                onClick={() => filterByButton("Approved")}
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 border-none cursor-pointer rounded-md"
              >
                Approved
              </button>
              <button
                onClick={() => filterByButton("Rejected")}
                className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 border-none cursor-pointer rounded-md"
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-4 rounded-md shadow-md shadow-black">
            {" "}
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>LOADING</div>
      )}
    </>
  );
};

export default Table;
