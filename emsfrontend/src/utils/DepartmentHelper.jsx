import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:1000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
        className="px-4 py-1 border-none bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(_id)}
        className="px-4 py-1 border-none bg-red-500 hover:bg-red-600 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
