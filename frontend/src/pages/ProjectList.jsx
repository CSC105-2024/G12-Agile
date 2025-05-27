import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"; 
import ProjectTable from "../components/ProjectTable";
import Pagination from "../components/Pagination";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import MemberModal from "../components/MemberModal";
import SprintModal from "../components/SprintModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { userApi } from "../api/userApi";
import axiosInstance from "../utils/axiosInstance";
import { projectApi } from "../api/projectApi";

const ProjectList = () => {
  const navigate = useNavigate();
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
  const [projects, setProjects] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [sprintCount, setSprintCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, projectRes] = await Promise.all([
          userApi.getCurrentUser(),
          projectApi.getAll(),
          axiosInstance.get("/projects")
        ]);

        const user = userRes.data;
        const filteredProjects = projectRes.data.filter((proj) => {
          if (user.role === "PM") return proj.pmId === user.id;
          if (user.role === "Dev") return proj.members.some((m) => m.userId === user.id);
          return false;
        });

        const formattedProjects = filteredProjects.map((proj) => {
          const today = new Date();
          const startedSprints = proj.sprints?.filter((sprint) => new Date(sprint.startDate) <= today).length || 0;
          return {
            id: proj.id,
            name: proj.name,
            description: proj.description,
            sprint: `${startedSprints}/${proj.sprints.length}`,
            status: capitalizeWords(proj.status.replace(/([a-z])([A-Z])/g, "$1 $2")),
            pm: proj.pm?.firstname || "Unknown",
            dev: proj.members?.map((m) => m.firstname || "No First Name").join(", ") || "No Members",
            memberEmails: proj.members?.map((m) => (m.user ? m.user.email : "")).filter(Boolean) || [],
            startDate: proj.startDate.split("T")[0],
            endDate: proj.endDate.split("T")[0],
          };
        });

        setProjects(formattedProjects);
      } catch (err) {
        console.error("Failed to fetch projects or user:", err);
      }
    };

    fetchData();
  }, []);

  const addSprintRow = () => {
    setSprints([...sprints, { start: "", end: "", points: "", duration: "2 week" }]);
  };

  const deleteSprintRow = (index) => {
    const newSprints = [...sprints];
    newSprints.splice(index, 1);
    setSprints(newSprints);
  };

  const calculateEndDate = (start, duration) => {
    const startDate = new Date(start);
    if (isNaN(startDate)) return "";
    const days = {
      "1 week": 7,
      "2 week": 14,
      "3 week": 21,
      "4 week": 28,
      "1 month": 30,
    }[duration] || 0;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);
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

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setMembers(project.memberEmails || []);
    setOpenModal(true);
  };
  
  const handleProjectClick = (project) => {
    if (!project.id) {
      console.error("❌ Not found project.id:", project);
      return;
    }
    navigate(`/projects/${project.id}`, {
      state: { from: "projectlist" },
    });
  };

  const handleSaveProject = async (updatedProject) => {
    try {
      if (!updatedProject.id) return console.error("Missing project ID");
  
      await projectApi.update(updatedProject.id, {
        name: updatedProject.name,
        description: updatedProject.description,
        startDate: updatedProject.startDate,
        endDate: updatedProject.endDate,
        members: updatedProject.members, 
      });
  
      const updatedProjects = projects.map((p) =>
        p.id === updatedProject.id
          ? {
              ...p,
              name: updatedProject.name,
              description: updatedProject.description,
              startDate: updatedProject.startDate,
              endDate: updatedProject.endDate,
              dev: updatedProject.members?.join(", ") || p.dev, 
            }
          : p
      );
  
      setProjects(updatedProjects);
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };
  
  const handleDeleteProject = async () => {
    try {
      await projectApi.delete(selectedProject.id);
      const updated = projects.filter((p) => p.id !== selectedProject.id);
      setProjects(updated); 
      setOpenConfirmDeleteModal(false);
      setOpenModal(false);
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };
  

  const capitalizeWords = (str) =>
    str.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "not started":
        return "bg-[#D9D9D9] border border-[#A7A7A7] text-[#606060]";
      case "in progress":
        return "bg-[#FFCC00] border border-[#FFCD06] text-white";
      case "completed":
        return "bg-[#4CC82D] border border-[#63D347] text-white";
      default:
        return "bg-gray-600";
    }
  };

  const filteredProjects = projects.filter((proj) => {
    const matchName = proj.name.toLowerCase().includes(filterText.toLowerCase());
    const matchStatus = filterStatus === "All" || proj.status === filterStatus;
    return matchName && matchStatus;
  });

  const projectsPerPage = 5;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen flex flex-col px-4 md:px-9">
      <div className="text-md text-gray-400 mt-8 font-poppins">
        <Link to="/dashboard" className="hover:underline text-gray-400">Dashboard</Link> {" > "}
        <span className="text-[#6837DE] font-poppins">Project List</span>
      </div>
      <h1 className="font-poppins flex flex-row justify-center items-center mt-4 text-2xl sm:text-4xl font-bold text-center bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent">Project List</h1>

      <div className="flex flex-col md:flex-row justify-between items-center px-9 mt-6 gap-4">
        <input
          type="text"
          placeholder="Search by project name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded-xl p-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:outline-none"
        />
        <button
          onClick={() => setOpenCreateModal(true)}
          className="w-full md:w-auto bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90"
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
            className={`font-poppins text-sm px-4 py-1 rounded-lg border ${
              filterStatus === status
                ? "bg-[#6837DE] text-white border-[#6837DE]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto mt-4">
        <ProjectTable
          projects={currentProjects}
          getStatusColor={getStatusColor}
          handleEditClick={handleEditClick}
          handleProjectClick={handleProjectClick}
        />
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      <CreateProjectModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        setOpenCreateProjectModal={setOpenCreateModal}
        setOpenMemberModal={setOpenMemberModal}
        setOpenCreateSprintModal={setOpenCreateSprintModal}
        setProjects={setProjects}
        projects={projects}
        members={members}
        setMembers={setMembers}
        sprints={sprints}
        sprintCount={sprintCount}
        setSprints={setSprints}
        setSprintCount={setSprintCount}
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