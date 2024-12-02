import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "70px",
    center: "true",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "110px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
    center: "true",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "130px",
    center: "true",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "150px",
    center: "true",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:1000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const getEmployees = async (id) => {
  let employees = [];
  try {
    const response = await axios.get(
      `http://localhost:1000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")} `,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
        className="px-4 py-1 border-none bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-md"
      >
        View
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
        className="px-4 py-1 border-none bg-pink-500 hover:bg-pink-600 cursor-pointer text-white rounded-md"
      >
        Edit
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/salary/${_id}`)}
        className="px-4 py-1 border-none bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-md"
      >
        Salary
      </button>

      <button
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${_id}`)}
        className="px-4 py-1 border-none bg-red-500 hover:bg-red-600 text-white cursor-pointer rounded-md"
      >
        Leave
      </button>
    </div>
  );
};
