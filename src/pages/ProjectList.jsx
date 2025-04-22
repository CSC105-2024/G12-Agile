import { useState } from "react";
import EditIcon from "../image/edit-246.png";

const ProjectList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: "Agile",
      description: "Project Management Website",
      sprint: "1/4",
      status: "Not started",
      pm: "Sorasit",
      dev: "Veerachai, Poowarin",
    },
    {
      name: "Calculator",
      description: "Calculator Application",
      sprint: "2/4",
      status: "In progress",
      pm: "Veerachai",
      dev: "Sorasit",
    },
    {
      name: "ChatGPT",
      description: "Chat Bot",
      sprint: "3/4",
      status: "In progress",
      pm: "Poowarin",
      dev: "Sorasit",
    },
    {
      name: "ROV",
      description: "Game Development",
      sprint: "4/4",
      status: "Completed",
      pm: "Method",
      dev: "Aokood",
    },
    {
      name: "JeebSao",
      description: "Game Development",
      sprint: "4/4",
      status: "Completed",
      pm: "Kuruto",
      dev: "bardsaipe",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Not started":
        return "bg-[#D9D9D9] text-[#606060]";
      case "In progress":
        return "bg-[#FFCC00] text-white";
      case "Completed":
        return "bg-[#4CC82D] text-white";
      default:
        return "bg-gray-500";
    }
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full text-center mt-8">
        <span className="font-poppins inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
          Project List
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-5 ml-9">
        <input
          type="text"
          placeholder="Search by project name"
          className="font-poppins placeholder-gray-300 w-80 h-9 p-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
        />
      </div>

      {/* Table */}
      <div className="mx-9 mt-6">
        <div className="rounded-xl border border-gray-300 shadow-sm">
          <table className="w-full table-fixed text-sm text-[#606060]">
            <thead className="border-b border-gray-300">
              <tr className="font-poppins">
                <th className="text-left px-4 py-3 text-xl">Project</th>
                <th className="text-center px-4 py-3 text-xl">Sprints</th>
                <th className="text-center px-4 py-3 text-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-poppins">
                    <div className="text-purple-700 hover:underline cursor-pointer text-base font-semibold">
                      {proj.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {proj.description}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="font-poppins">PM:</span> {proj.pm}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-poppins">Dev:</span> {proj.dev}
                    </div>
                  </td>

                  <td className="text-center px-4 py-4 font-poppins">
                    {proj.sprint}
                  </td>

                  <td className="text-center px-4 py-4 font-poppins">
                    <div className="flex justify-center items-center gap-2">
                      <span
                        className={`font-poppins text-xs px-3 py-1 rounded-full whitespace-nowrap min-w-[100px] text-center ${getStatusColor(
                          proj.status
                        )}`}
                      >
                        {proj.status}
                      </span>
                      <button onClick={() => handleEditClick(proj)}>
                        <img
                          src={EditIcon}
                          alt="Edit"
                          className="w-5 h-5 hover:scale-110 transition-transform"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {openModal && selectedProject && (
        <div className="fixed inset-0 bg-gray-200/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl w-[600px] shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center font-poppins text-purple-600 mb-6">
              Edit Project
            </h2>

            <div className="space-y-4 font-poppins text-sm">
              <div>
                <label className="block mb-1 text-gray-600">Project name</label>
                <input
                  type="text"
                  defaultValue={selectedProject.name}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-600">
                  Project description
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedProject.description}
                  className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-gray-600">Start Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-gray-600">End Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <div className="flex flex-col gap-3">
                <button className="bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white font-poppins px-5 py-2 rounded-lg hover:opacity-90 flex items-center gap-2">
                  Members
                  <img src={EditIcon} alt="Members Icon" className="w-4 h-4" />
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-poppins px-5 py-2 rounded-lg">
                  Delete
                </button>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 flex flex-col items-center gap-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-poppins px-6 py-2 rounded-xl">
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-poppins px-6 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
