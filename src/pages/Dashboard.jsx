import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="w-full text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
          Dashboard
        </span>
      </div>
      
      {/* Search Bar */}
      <div className=" mt-5 ml-9">
        <input
          type="text"
          placeholder="Search by project name"
          className=" font-poppins placeholder-gray-300 w-110 h-9 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
      </div>
      
      {/* Recent Project Section */}
      <div className="mt-6 px-10">
      <div className="w-full">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-xl font-bold">
          Recent Project
        </span>
      </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold font-poppins">Project Agile</p>
            <p className="text-sm text-gray-500 font-poppins">Last update 02-03-2025</p>
            <span className="text-[#FFCC00] font-semibold">● In Progress</span>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold font-poppins">Project RoV</p>
            <p className="text-sm text-gray-500 font-poppins">Last update 01-01-2025</p>
            <span className="text-[#4CC82D] font-semibold">● Done</span>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold font-poppins">Project Calculator</p>
            <p className="text-sm text-gray-500 font-poppins">Last update 12-11-2024</p>
            <span className="text-[#4CC82D] font-semibold">● Done</span>
          </div>
        </div>
      </div>
      
      {/* Task Update Section */}
      <div className="mt-8 px-10">
      <div className="w-full">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-xl font-bold">
          Task Update
        </span>
      </div>
        <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold font-poppins">Create Filter</p>
            <span className="text-gray-600 font-semibold font-poppins">Project: Agile, Sprint: 3</span>
            <p className="text-sm text-gray-500 font-poppins">Update 05-03-2025</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold font-poppins">Profile Management</p>
            <span className="text-gray-600 font-semibold font-poppins">Project: Agile, Sprint: 1</span>
            <p className="text-sm text-gray-500 font-poppins">Update 01-03-2025</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <p className="font-bold font-poppins">Change Status</p>
            <span className="text-gray-600 font-semibold font-poppins">Project: Agile, Sprint: 1</span>
            <p className="text-sm text-gray-500 font-poppins">Update 05-03-2025</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-35 bg-gradient-to-r from-[#6837DE] to-purple-600 text-white py-4 mt-60">
        <div className="text-sm font-poppins text-center font-bold">
          <p>This is Footer</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;