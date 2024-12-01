import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();

  console.log("Employee ID:", id);
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filterSalaries === null ? (
        <div>Loading</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold ">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="serach by emp ID"
              className="border px-2 rounded-md border-gray-300 py-1 mr-3"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 border border-gray-300">
                <tr>
                  <th className="px-6 py-3"> SNO</th>
                  <th className="px-6 py-3"> EMP ID</th>
                  <th className="px-6 py-3"> Salary</th>
                  <th className="px-6 py-3"> Allowance</th>
                  <th className="px-6 py-3"> Deduction</th>
                  <th className="px-6 py-3"> Total</th>
                  <th className="px-6 py-3"> Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, i) => (
                  <tr
                    key={i}
                    className="bg-white border  text-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>NO RECORDS</div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
