import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ActivityLog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const activities = [
    {
      action: "Task status change",
      task: "Task A",
      user: "Project Manager A",
      timestamp: "2033-09-30 23:45",
    },
    {
      action: "Task assigned",
      task: "Task C",
      user: "Project Manager C",
      timestamp: "2033-10-02 21:30",
    },
    {
      action: "Task added",
      task: "Task B",
      user: "Developer B",
      timestamp: "2033-10-03 01:30",
    },
    {
      action: "Task deleted",
      task: "Task A",
      user: "Project Manager A",
      timestamp: "2033-12-31 00:01",
    },
    {
      action: "Task completed",
      task: "Task D",
      user: "Developer D",
      timestamp: "2034-01-10 14:20",
    },
    {
      action: "Task assigned",
      task: "Task E",
      user: "Project Manager E",
      timestamp: "2034-02-15 09:10",
    },
    {
      action: "Task reviewed",
      task: "Task F",
      user: "Developer F",
      timestamp: "2034-03-22 11:45",
    },
    {
      action: "Task status change",
      task: "Task G",
      user: "Project Manager G",
      timestamp: "2034-04-05 17:30",
    },
  ];

  
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const displayedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="w-full text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-4xl font-extrabold leading-relaxed pt-4 pb-4">
          Activity Log
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-5 flex justify-start max-w-screen-xl mx-auto px-8">
        <input
          type="text"
          placeholder="Search by project name "
          className="font-poppins placeholder-gray-400 w-60 h-9 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-gray-200 text-gray-700 w-100"
        />
      </div>

      {/* Activity Log Table */}
      <div className="bg-white p-8 shadow-lg rounded-lg mt-6 max-w-screen-xl mx-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden border border-gray-500">
          <thead>
            <tr className="bg-gray-200 text-gray-500">
              <th className="p-6 text-left font-bold text-gray-700 font-poppins text-lg">
                Action
              </th>
              <th className="p-6 text-left font-bold text-gray-700 font-poppins text-lg">
                Task Name
              </th>
              <th className="p-6 text-left font-bold text-gray-700 font-poppins text-lg">
                User
              </th>
              <th className="p-6 text-left font-bold text-gray-700 font-poppins text-lg">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedActivities.map((activity, index) => (
              <tr key={index} className="border-t">
                <td className="p-6 font-semibold text-gray-500 font-poppins text-lg">
                  {activity.action}
                </td>
                <td className="p-6 font-semibold text-gray-500 font-poppins text-lg">
                  {activity.task}
                </td>
                <td className="p-6 font-semibold text-gray-500 font-poppins text-lg">
                  {activity.user}
                </td>
                <td className="p-6 font-semibold text-gray-500 font-poppins text-lg">
                  {activity.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => changePage(currentPage - 1)}
          className={`px-4 py-2 border rounded-md mx-1 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-purple-500 text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          className={`px-4 py-2 border rounded-md mx-1 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ActivityLog;
