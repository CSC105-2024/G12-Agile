import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import rectangleImg from "../image/Rectangle 9637.png";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleProjectClick = (projectName) => {
    navigate("/projectdetail", { state: { from: "dashboard", projectName } });
  };

  const projects = [
    {
      name: "Project Agile",
      lastUpdate: "02-03-2025",
      status: "In Progress",
      color: "#FFCC00",
    },
    {
      name: "Project RoV",
      lastUpdate: "01-01-2025",
      status: "Done",
      color: "#4CC82D",
    },
    {
      name: "Project Calculator",
      lastUpdate: "12-11-2024",
      status: "Done",
      color: "#4CC82D",
    },
    {
      name: "Project AI Chatbot",
      lastUpdate: "15-04-2025",
      status: "Done",
      color: "#4CC82D",
    },
    {
      name: "Project Task Manager",
      lastUpdate: "10-04-2025",
      status: "In Progress",
      color: "#FFCC00",
    },
    {
      name: "Project Inventory System",
      lastUpdate: "18-04-2025",
      status: "In Progress",
      color: "#FFCC00",
    },
  ];

  const taskUpdates = [
    {
      taskName: "Create Filter",
      projectName: "Agile",
      sprint: 3,
      updateDate: "05-03-2025",
    },
    {
      taskName: "Profile Management",
      projectName: "Agile",
      sprint: 1,
      updateDate: "01-03-2025",
    },
    {
      taskName: "Fix UI",
      projectName: "Task Manager",
      sprint: 2,
      updateDate: "05-03-2025",
    },
    {
      taskName: "Create Profile",
      projectName: "AI Chatbot",
      sprint: 3,
      updateDate: "05-03-2025",
    },
    {
      taskName: "Text Filter",
      projectName: "Task Manager",
      sprint: 3,
      updateDate: "05-03-2025",
    },
    {
      taskName: "AI Textbox",
      projectName: "AI Chatbot",
      sprint: 1,
      updateDate: "05-03-2025",
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-4xl font-extrabold leading-relaxed pt-4 pb-4">
          Dashboard
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-5 ml-9">
        <input
          type="text"
          placeholder="Search by project name"
          className="font-poppins w-110 h-9 p-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Recent Project Section */}
      <div className="mt-6 px-10">
        <div className="w-full flex-nowrap min-w-[1800px]">
          <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-xl font-bold font-poppins">
            Recent Project
          </span>
        </div>
        <div className="flex overflow-x-auto gap-6 mt-6 text-gray-700 font-poppins scroll-smooth snap-x">
          {filteredProjects.map((project, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(project.name)}
              className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[300px] snap-start cursor-pointer hover:shadow-lg transition-all"
            >
              <img
                src={rectangleImg}
                alt={project.name}
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <div className="flex justify-between w-full items-center">
                <span className="hover:underline font-bold font-poppins text-lg bg-transparent p-0 text-left">
                  {project.name}
                </span>
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
            </button>
          ))}
        </div>
      </div>

      {/* Task Update Section */}
      <div className="mt-8 px-10 overflow-x-auto">
        <div className="w-full">
          <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-xl font-bold font-poppins">
            Task Update
          </span>
        </div>
        <div className="flex gap-6 mt-6 text-gray-700 font-poppins overflow-x-auto whitespace-nowrap">
          {taskUpdates.map((task, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(task.projectName)}
              className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px] cursor-pointer hover:shadow-lg transition-all"
            >
              <img
                src={rectangleImg}
                alt={task.taskName}
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg hover:underline">{task.taskName}</p>
              <p className="font-bold text-lg font-poppins">
                Project: {task.projectName}
              </p>
              <span className="font-bold text-lg text-gray-600">
                Sprint: {task.sprint}
              </span>
              <p className="text-sm text-gray-500 font-poppins">
                Update {task.updateDate}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="h-40 bg-gradient-to-r from-[#6837DE] to-purple-600 text-white py-6 mt-20">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center mt-4">
          <p className="text-lg font-semibold">
            © 2025 AGILE. All Rights Reserved.
          </p>
          <p className="font-semibold mt-2">Follow us on:</p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <FaFacebook /> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <FaTwitter /> Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
