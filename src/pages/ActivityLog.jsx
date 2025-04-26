import { useState } from "react";

const ActivityLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const activities = [
    { action: "Task status change", task: "Task A", user: "Project Manager A", timestamp: "2033-09-30 23:45" },
    { action: "Task assigned", task: "Task C", user: "Project Manager C", timestamp: "2033-10-02 21:30" },
    { action: "Task added", task: "Task B", user: "Developer B", timestamp: "2033-10-03 01:30" },
    { action: "Task deleted", task: "Task A", user: "Project Manager A", timestamp: "2033-12-31 00:01" },
    { action: "Task completed", task: "Task D", user: "Developer D", timestamp: "2034-01-10 14:20" },
    { action: "Task assigned", task: "Task E", user: "Project Manager E", timestamp: "2034-02-15 09:10" },
    { action: "Task reviewed", task: "Task F", user: "Developer F", timestamp: "2034-03-22 11:45" },
    { action: "Task status change", task: "Task G", user: "Project Manager G", timestamp: "2034-04-05 17:30" },
  ];

  const filteredActivities = activities.filter(activity =>
    activity.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const displayedActivities = filteredActivities.slice(
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
      {/* Title with background */}
      <div className="w-full text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-4xl font-extrabold leading-relaxed pt-4 pb-4">
          Activity Log
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-5 flex justify-start max-w-screen-xl mx-auto px-4 sm:px-8">
        <input
          type="text"
          placeholder="Search by task name, action, or user"
          className="font-poppins placeholder-gray-300 w-80 sm:w-96 h-10 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Activity Log Table */}
      <div className="overflow-x-auto p-4 sm:p-8 shadow-lg rounded-lg  max-w-screen-xl mx-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="text-gray-500">
              <th className="p-4 sm:p-6 text-left font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">Action</th>
              <th className="p-4 sm:p-6 text-left font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">Task Name</th>
              <th className="p-4 sm:p-6 text-left font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">User</th>
              <th className="p-4 sm:p-6 text-left font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {displayedActivities.map((activity, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 sm:p-6 font-semibold text-gray-500 font-poppins text-sm sm:text-lg">{activity.action}</td>
                <td className="p-4 sm:p-6 font-semibold text-gray-500 font-poppins text-sm sm:text-lg">{activity.task}</td>
                <td className="p-4 sm:p-6 font-semibold text-gray-500 font-poppins text-sm sm:text-lg">{activity.user}</td>
                <td className="p-4 sm:p-6 font-semibold text-gray-500 font-poppins text-sm sm:text-lg">{activity.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center mt-5 space-x-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          className={`px-4 py-1 border border-gray-300 rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : " hover:bg-gray-300"}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className={`w-8 h-8 rounded-lg border border-gray-300 text-sm font-semibold ${currentPage === index + 1 ? "bg-[#6837DE]  border-[#6837DE] text-white font-bold" : " hover:bg-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          className={`px-4 py-1 border border-gray-300 rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : " hover:bg-gray-300"}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ActivityLog;
