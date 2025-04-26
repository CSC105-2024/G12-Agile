import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import rectangleImg from "../image/Rectangle 9637.png";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

{
  /* Footer */
}
<footer className="h-40 bg-gradient-to-r from-[#6837DE] to-purple-600 text-white py-6 mt-80">
  <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
    <p className="text-lg font-semibold">
      © 2025 Your Company. All Rights Reserved.
    </p>
    <div className="flex gap-6 mt-3">
      <Link to="/about" className="hover:underline">
        About
      </Link>
      <Link to="/contact" className="hover:underline">
        Contact
      </Link>
      <Link to="/privacy" className="hover:underline">
        Privacy Policy
      </Link>
    </div>
    <p className="text-sm mt-2">Follow us on:</p>
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
</footer>;

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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
          className="font-poppins placeholder-gray-300 w-110 h-9 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[300px] snap-start"
            >
              <Link to="/projectdetail" className="w-full">
                <img
                  src={rectangleImg}
                  alt={project.name}
                  className="w-full h-48 rounded-xl mb-4 object-cover"
                />
              </Link>
              <div className="flex justify-between w-full items-center">
                <Link
                  to="/projectdetail"
                  className="hover:underline font-bold font-poppins text-lg"
                >
                  {project.name}
                </Link>
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
      <div className="mt-8 px-10 overflow-x-auto">
        <div className="w-full">
          <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-xl font-bold font-poppins">
            Task Update
          </span>
        </div>
        <div className="flex gap-6 mt-6 text-gray-700 font-poppins overflow-x-auto whitespace-nowrap">
          {/* Task items */}
          <div className="flex gap-6 overflow-x-auto ">
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px]">
              <img
                src={rectangleImg}
                alt="Create Filter"
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg">Create Filter</p>
              <p className="font-bold text-lg font-poppins">Project: Agile</p>
              <span className="font-bold text-lg text-gray-600">Sprint: 3</span>
              <p className="text-sm text-gray-500 font-poppins">
                Update 05-03-2025
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px]">
              <img
                src={rectangleImg}
                alt="Profile Management"
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg">
                Profile Management
              </p>
              <p className="font-bold text-lg font-poppins">Project: Agile</p>
              <span className="font-bold text-lg text-gray-600">Sprint: 1</span>
              <p className="text-sm text-gray-500 font-poppins">
                Update 01-03-2025
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px]">
              <img
                src={rectangleImg}
                alt="Fix UI"
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg">Fix UI</p>
              <p className="font-bold text-lg font-poppins">
                Project: Task Manager
              </p>
              <span className="font-bold text-lg text-gray-600">Sprint: 2</span>
              <p className="text-sm text-gray-500 font-poppins">
                Update 05-03-2025
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px]">
              <img
                src={rectangleImg}
                alt="Create Profile"
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg">Create Profile</p>
              <p className="font-bold text-lg font-poppins">
                Project: Ai Chatbot
              </p>
              <span className="font-bold text-lg text-gray-600">Sprint: 3</span>
              <p className="text-sm text-gray-500 font-poppins">
                Update 05-03-2025
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px]">
              <img
                src={rectangleImg}
                alt="Text Filter"
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg">Text Filter</p>
              <p className="font-bold text-lg font-poppins">
                Project: Task Manager
              </p>
              <span className="font-bold text-lg text-gray-600">Sprint: 3</span>
              <p className="text-sm text-gray-500 font-poppins">
                Update 05-03-2025
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col items-start text-left min-w-[280px] md:min-w-[300px]">
              <img
                src={rectangleImg}
                alt="AI Textbox"
                className="w-full h-48 rounded-xl mb-4 object-cover"
              />
              <p className="font-bold font-poppins text-lg">AI Textbox</p>
              <p className="font-bold text-lg font-poppins">
                Project: AI Chatbot
              </p>
              <span className="font-bold text-lg text-gray-600">Sprint: 1</span>
              <p className="text-sm text-gray-500 font-poppins">
                Update 05-03-2025
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-40 bg-gradient-to-r from-[#6837DE] to-purple-600 text-white py-6 mt-20">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <p className="text-lg font-semibold">
            © 2025 AGILE. All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-3">
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm mt-2">Follow us on:</p>
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