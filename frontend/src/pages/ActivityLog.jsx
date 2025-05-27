import { useEffect, useState } from "react";
import { activityApi } from "../api/activityApi";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await activityApi.getAll();
        setActivities(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch activity logs:", err);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const userEmail = activity.user?.email || "";
    return (
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
      <div className="w-full text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-4xl font-extrabold leading-relaxed pt-4 pb-4">
          Activity Log
        </span>
      </div>

      {/* Search */}
      <div className="mt-5 flex justify-start max-w-screen-xl mx-auto px-4 sm:px-8">
        <input
          type="text"
          placeholder="Search by action or user email"
          className="font-poppins placeholder-gray-300 w-80 sm:w-96 h-10 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-4 sm:p-8 shadow-lg rounded-lg max-w-screen-xl mx-auto mt-4">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="text-gray-500">
              <th className="p-4 text-left font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">
                Action
              </th>
              <th className="p-4 text-center font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">
                User
              </th>
              <th className="p-4 text-left font-bold text-gray-700 font-poppins text-sm sm:text-lg border-b border-gray-300">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedActivities.map((activity, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 font-semibold text-gray-600 font-poppins text-sm sm:text-base">
                  {activity.action}
                </td>
                <td className="p-4 font-semibold text-gray-600 font-poppins text-sm sm:text-base text-center">
                  {activity.user?.email || "-"}
                </td>
                <td className="p-4 font-semibold text-gray-600 font-poppins text-sm sm:text-base">
                  {new Date(activity.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center mt-5 space-x-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          className={`px-4 py-1 border border-gray-300 rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => changePage(index + 1)}
            className={`w-8 h-8 rounded-lg border text-sm font-semibold ${
              currentPage === index + 1
                ? "bg-[#6837DE] border-[#6837DE] text-white font-bold"
                : "border-gray-300 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          className={`px-4 py-1 border border-gray-300 rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
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
