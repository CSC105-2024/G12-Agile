import { Link, useNavigate } from "react-router-dom";
import rectangleImg from "../image/Rectangle 9637.png";
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col ">
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
        <div className="grid grid-cols-3 gap-6 mt-6 text-gray-700">
          {[
            {
              name: "Project Agile",
              lastUpdate: "02-03-2025",
              status: "In Progress",
              color: "#FFCC00", // สีเหลือง
            },
            {
              name: "Project RoV",
              lastUpdate: "01-01-2025",
              status: "Done",
              color: "#4CC82D", // สีเขียว
            },
            {
              name: "Project Calculator",
              lastUpdate: "12-11-2024",
              status: "Done",
              color: "#4CC82D", // สีเขียว
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left"
            >
              <img
                src={rectangleImg}
                alt={project.name}
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <div className="flex justify-between w-full items-center">
                <p className="font-bold font-poppins text-lg">{project.name}</p>
                <span className="font-bold">
                  <span style={{ color: project.color, fontSize: "24px" }}>
                    ●
                  </span>{" "}
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-poppins">
                Last update {project.lastUpdate}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Task Update Section */}
      <div className="mt-8 px-10">
        <div className="w-full flex justify-between items-center">
          <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-xl font-bold">
            Task Update
          </span>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6  text-gray-700">
          <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left">
            <img
              src={rectangleImg}
              alt="Create Filter"
              className="w-full h-48 rounded-xl mb-4 object-cover"
            />
            <div className="flex justify-between w-full items-center">
              <p className="font-bold font-poppins text-lg flex-1">
                Create Filter
              </p>
              <div className="flex flex-col items-end justify-center h-12">
                <p className="font-bold text-lg font-poppins">Project: Agile</p>
                <span className="font-bold text-lg text-gray-600">
                  Sprint: 3
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-poppins">
              Update 05-03-2025
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left">
            <img
              src={rectangleImg}
              alt="Profile Management"
              className="w-full h-48 rounded-xl mb-4 object-cover"
            />
            <div className="flex justify-between w-full items-center">
              <p className="font-bold font-poppins text-lg flex-1">
                Profile Management
              </p>
              <div className="flex flex-col items-end justify-center h-12">
                <p className="font-bold text-lg font-poppins">Project: Agile</p>
                <span className="font-bold text-lg text-gray-600">
                  Sprint: 1
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-poppins">
              Update 01-03-2025
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left">
            <img
              src={rectangleImg}
              alt="Change Status"
              className="w-full h-48 rounded-xl mb-4 object-cover"
            />
            <div className="flex justify-between w-full items-center">
              <p className="font-bold font-poppins text-lg flex-1">
                Change Status
              </p>
              <div className="flex flex-col items-end justify-center h-12">
                <p className="font-bold text-lg font-poppins">Project: Agile</p>
                <span className="font-bold text-lg text-gray-600">
                  Sprint: 1
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 font-poppins">
              Update 05-03-2025
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-51 bg-gradient-to-r from-[#6837DE] to-purple-600 text-white py-4 mt-80">
        <div className="text-sm font-poppins text-center font-bold">
          <p>This is Footer</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
