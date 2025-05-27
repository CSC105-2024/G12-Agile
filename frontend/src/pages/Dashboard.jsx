import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { projectApi } from "../api/projectApi";
import { taskApi } from "../api/taskApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [taskUpdates, setTaskUpdates] = useState([]);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`, { state: { from: "dashboard" } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await projectApi.getAll();
        const data = res.data;
        setProjects(data);

        const allTasks = [];
        for (const proj of data) {
          const taskRes = await taskApi.getByProjectId(proj.id);
          const tasks = taskRes.data || [];
          tasks.forEach((t) => {
            allTasks.push({
              taskName: t.name,
              projectName: proj.name,
              sprint: t.sprint?.index || t.sprintId,
              assignee: t.assignee?.email || "Unassigned",
              projectId: proj.id,
            });
          });
        }

        setTaskUpdates(allTasks.slice(0, 10)); 
      } catch (err) {
        console.error("❌ Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#4CC82D";
      case "InProgress":
        return "#FFCC00";
      case "NotStarted":
      default:
        return "#A7A7A7";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-4xl font-extrabold pt-4 pb-4">
          Dashboard
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-5 ml-9">
        <input
          type="text"
          placeholder="Search by project name"
          className="font-poppins w-80 h-9 p-3 border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content */}
      <main className="flex-grow">
        {/* Recent Projects */}
        <div className="mt-6 px-10">
          <h2 className="text-xl font-bold  bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent">Recent Projects</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span
                    className="font-bold"
                    style={{ color: getStatusColor(project.status) }}
                  >
                    ● {project.status.replace(/([A-Z])/g, " $1")}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Start: {project.startDate?.split("T")[0]}
                </p>
                <p className="text-sm text-gray-500">
                  End: {project.endDate?.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Task Updates */}
        <div className="mt-10 px-10">
          <h2 className="text-xl font-bold  bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent">Task Updates</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-4">
            {taskUpdates.map((task, i) => (
              <div
                key={i}
                onClick={() => handleProjectClick(task.projectId)}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
              >
                <h3 className="font-semibold text-lg">{task.taskName}</h3>
                <p className="text-sm text-gray-500">Project: {task.projectName}</p>
                <p className="text-sm text-gray-500">Sprint: {task.sprint}</p>
                <p className="text-sm text-gray-500">Assignee: {task.assignee}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#6837DE] to-purple-600 text-white py-6">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <p className="text-lg font-semibold">© 2025 AGILE. All Rights Reserved.</p>
          <p className="font-semibold mt-2">Follow us on:</p>
          <div className="flex gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2">
              <FaFacebook /> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2">
              <FaTwitter /> Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
