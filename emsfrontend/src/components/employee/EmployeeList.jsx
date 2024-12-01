import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  const [filteredEmployees, setFilteredEmployees] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:1000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        console.log("emp", response.data);
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:1000/${emp.userId.profileImage}`}
                alt={`${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));
          setEmployee(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const records = employee.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-4 ">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-5">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center px-5">
        <input
          type="text"
          placeholder="search by name"
          className="px-4 py-0.5 "
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
        >
          {" "}
          Add New Employee
        </Link>
      </div>
      <div className="rounded-md p-4">
        <DataTable columns={columns} data={filteredEmployees} pagination />
      </div>
    </div>
  );
};

export default EmployeeList;
