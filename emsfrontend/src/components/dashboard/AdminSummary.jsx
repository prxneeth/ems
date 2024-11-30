import React from "react";
import Summarycard from "./Summarycard";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Summarycard
          icon={<i className="fa-solid fa-users"></i>}
          text="Total Employees"
          number={15}
          color="bg-blue-500"
        />
        <Summarycard
          icon={<i className="fa-solid fa-building"></i>}
          text="Departments"
          number={5}
          color="bg-green-500"
        />
        <Summarycard
          icon={<i className="fa-solid fa-sack-dollar"></i>}
          text="Salary"
          number="$654"
          color="bg-yellow-500"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Applied"
            number={5}
            color="bg-purple-500"
          />
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Approved"
            number={2}
            color="bg-green-500"
          />
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Pending"
            number={4}
            color="bg-orange-500"
          />
          <Summarycard
            icon={<i className="fa-solid fa-sack-dollar"></i>}
            text="Leave Rejected"
            number={1}
            color="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
