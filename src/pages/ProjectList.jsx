import { useState } from "react";
import ProjectTable from "../components/ProjectTable";
import Pagination from "../components/Pagination";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import MemberModal from "../components/MemberModal";
import SprintModal from "../components/SprintModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const ProjectList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [openCreateSprintModal, setOpenCreateSprintModal] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [projects, setProjects] = useState([
    { name: "Agile", description: "Project Management Website", sprint: "1/4", status: "Not started", pm: "Sorasit", dev: "Veerachai, Poowarin", startDate: "2025-04-01", endDate: "2025-04-15" },
    { name: "Calculator", description: "Calculator Application", sprint: "2/4", status: "In progress", pm: "Veerachai", dev: "Sorasit", startDate: "2025-04-10", endDate: "2025-04-30" },
    { name: "ChatGPT", description: "Chat Bot", sprint: "3/4", status: "In progress", pm: "Poowarin", dev: "Sorasit", startDate: "2025-05-01", endDate: "2025-05-15" },
    { name: "ROV", description: "Game Development", sprint: "4/4", status: "In progress", pm: "Method", dev: "Aokood", startDate: "2025-05-01", endDate: "2025-07-31" },
    { name: "Minecraft", description: "Game Development", sprint: "4/4", status: "Completed", pm: "Kuruto", dev: "bardsaipe", startDate: "2024-02-01", endDate: "2025-02-28" },
    { name: "Pokemon", description: "Game Development", sprint: "1/1", status: "In progress", pm: "Ash", dev: "Pikachu", startDate: "2025-01-01", endDate: "2025-01-31" }
  ]);

  const [sprints, setSprints] = useState([]);
  const [sprintCount, setSprintCount] = useState(1);

  const addSprintRow = () => {
    setSprints([...sprints, { start: "", end: "", points: "", duration: "1 month" }]);
  };

  const deleteSprintRow = (index) => {
    const newSprints = [...sprints];
    newSprints.splice(index, 1);
    setSprints(newSprints);
  };

  const calculateEndDate = (start, duration) => {
    const startDate = new Date(start);
    if (isNaN(startDate)) return "";
    let daysToAdd = {
      "1 week": 7,
      "2 week": 14,
      "3 week": 21,
      "4 week": 28,
      "1 month": 30
    }[duration] || 0;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysToAdd);
    return endDate.toISOString().split("T")[0];
  };

  const handleSprintChange = (index, field, value) => {
    const newSprints = [...sprints];
    newSprints[index][field] = value;
    if (field === "start" || field === "duration") {
      const start = field === "start" ? value : newSprints[index].start;
      const duration = field === "duration" ? value : newSprints[index].duration;
      newSprints[index].end = calculateEndDate(start, duration);
    }
    setSprints(newSprints);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not started": return "bg-[#D9D9D9] border border-[#A7A7A7] text-[#606060] font-semibold";
      case "In progress": return "bg-[#FFCC00] border border-[#FFCD06] text-white font-semibold";
      case "Completed": return "bg-[#4CC82D] border border-[#63D347] text-white font-semibold";
      default: return "bg-gray-500";
    }
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setMembers(project.dev ? project.dev.split(",").map((d) => d.trim()) : []);
    setOpenModal(true);
  };

  const handleSaveProject = (updatedProject) => {
    const updatedProjects = projects.map((p) =>
      p === selectedProject ? updatedProject : p
    );
    setProjects(updatedProjects);
  };

  const handleDeleteProject = () => {
    const updated = projects.filter((p) => p !== selectedProject);
    setProjects(updated);
    setOpenConfirmDeleteModal(false);
    setOpenModal(false);
  };

  const filteredProjects = projects.filter((proj) => {
    const matchName = proj.name.toLowerCase().includes(filterText.toLowerCase());
    const matchStatus = filterStatus === "All" || proj.status === filterStatus;
    return matchName && matchStatus;
  });

  const projectsPerPage = 5;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full text-center mt-8">
        <span className="font-poppins inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
          Project List
        </span>
      </div>

      <div className="text-gray-600 mt-5 ml-9 flex items-center justify-between pr-9">
        <input
          type="text"
          placeholder="Search by project name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="font-poppins placeholder-gray-300 w-80 h-9 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
        />
        <button
          onClick={() => setOpenCreateModal(true)}
          className="font-semibold bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white font-poppins px-5 py-2 rounded-xl hover:opacity-90"
        >
          + Create Project
        </button>
      </div>
      <div className="flex gap-2 mt-4 ml-9">
        {["All", "Not started", "In progress", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilterStatus(status);
              setCurrentPage(1);
            }}
            className={`font-semibold font-poppins px-4 py-1 rounded-lg border text-sm transition
              ${
                filterStatus === status
                  ? "bg-[#6837DE] text-white border-[#6837DE]"
                  : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      <ProjectTable
        projects={currentProjects}
        getStatusColor={getStatusColor}
        handleEditClick={handleEditClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <CreateProjectModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        setOpenMemberModal={setOpenMemberModal}
        setOpenCreateSprintModal={setOpenCreateSprintModal}
        setProjects={setProjects}
        projects={projects}
        members={members}
        setMembers={setMembers}
        sprintCount={sprintCount}
      />

      <EditProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        project={selectedProject}
        setOpenMemberModal={setOpenMemberModal}
        onDelete={() => setOpenConfirmDeleteModal(true)}
        setProjects={setProjects}
        projects={projects}
        onSave={handleSaveProject}
        members={members}
        setMembers={setMembers}
      />

      <MemberModal
        open={openMemberModal}
        onClose={() => setOpenMemberModal(false)}
        members={members}
        setMembers={setMembers}
      />

      <SprintModal
        open={openCreateSprintModal}
        onClose={() => setOpenCreateSprintModal(false)}
        sprints={sprints}
        setSprints={setSprints}
        handleSprintChange={handleSprintChange}
        addSprintRow={addSprintRow}
        deleteSprintRow={deleteSprintRow}
        onUpdateSprintCount={setSprintCount}
      />

      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={() => setOpenConfirmDeleteModal(false)}
        onConfirm={handleDeleteProject}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectList;
