import React, { useEffect, useState } from "react";
import Summarycard from "./Summarycard";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/dashboard/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary || Object.keys(summary).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Summarycard
          icon={<i className="fa-solid fa-users"></i>}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-blue-500"
        />
        <Summarycard
          icon={<i className="fa-solid fa-building"></i>}
          text="Departments"
          number={summary.totalDepartments}
          color="bg-pink-500"
        />
        <Summarycard
          icon={<i className="fa-solid fa-sack-dollar"></i>}
          text="Salary"
          number={summary.totalSalary}
          color="bg-yellow-500"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Applied"
            number={summary.leaveSummary?.appliedFor || 0}
            color="bg-purple-500"
          />
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Approved"
            number={summary.leaveSummary?.approved || 0}
            color="bg-green-500"
          />
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Pending"
            number={summary.leaveSummary?.pending || 0}
            color="bg-orange-500"
          />
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Rejected"
            number={summary.leaveSummary?.rejected || 0}
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
