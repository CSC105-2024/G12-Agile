import React, { useState, useEffect } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { Listbox, Dialog } from "@headlessui/react";
import { useLocation, useParams, Link } from "react-router-dom";
import AddTaskPopup from "../components/AddTaskPopup";
import EditTaskPopup from "../components/EditTaskPopup";
import EditSprintPopup from "../components/EditSprintPopup";
import DeleteSprintDialog from "../components/DeleteSprintDialog";
import EditIcon from "../image/edit-246.png";
import { projectApi } from "../api/projectApi";
import { taskApi } from "../api/taskApi";

function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const fromPage = location.state?.from || "projectlist";

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSprint, setSelectedSprint] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isEditSprintOpen, setIsEditSprintOpen] = useState(false);
  const [isDeleteSprintOpen, setIsDeleteSprintOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [sprintToDelete, setSprintToDelete] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, taskRes] = await Promise.all([
          projectApi.getById(id),
          taskApi.getByProjectId(id),
        ]);

        setProject(projectRes.data);
        const taskList = Array.isArray(taskRes.data) ? taskRes.data : [];
        setTasks(taskList);

        const formatted = (projectRes.data.sprints || [])
          .sort((a, b) => a.index - b.index)
          .map((s) => ({
            id: s.id,
            name: `Sprint ${s.index}`,
            start: s.startDate?.split("T")[0] || "-",
            end: s.endDate?.split("T")[0] || "-",
            expectedPoints: s.expectedPoints,
            duration: s.duration,
          }));
        setSprints(formatted);
      } catch (err) {
        console.error("❌ Error loading project detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const progress = tasks.length
    ? Math.round(
        (tasks.filter((t) => t.status === "Completed").length / tasks.length) *
          100
      )
    : 0;

  const filteredTasks = tasks.filter(
    (task) =>
      (selectedSprint === 0 || task.sprint?.id === selectedSprint) &&
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const determineProjectStatus = (tasks) => {
    if (!tasks.length) return "NotStarted";
  
    const allCompleted = tasks.every((t) => t.status === "Completed");
    if (allCompleted) return "Completed";
  
    const anyInProgress = tasks.some((t) => t.status === "InProgress");
    if (anyInProgress) return "InProgress";
  
    return "NotStarted";
  };


  const tasksPerPage = 10;
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleAddTask = async (newTask) => {
    try {
      const sprint = sprints.find((s) => s.id === newTask.sprint);
      const sprintIndex = parseInt(sprint.name.replace("Sprint ", ""));

      const res = await taskApi.create(project.id, sprintIndex, {
        name: newTask.name,
        description: newTask.description,
        point: newTask.point,
      });

      console.log("✅ Created Task:", res.data);
      setTasks((prev) => [
        ...prev,
        {
          ...res.data,
          sprint: { id: newTask.sprint },
        },
      ]);

      setIsAddOpen(false);
    } catch (err) {
      console.error(
        "❌ Failed to add task:",
        err.response?.data || err.message
      );
    }
  };

  const handleDeleteSprint = () => {
    if (!sprintToDelete) return;
    setSprints((prev) => prev.filter((s) => s.id !== sprintToDelete.id));
    setTasks((prev) => prev.filter((t) => t.sprint?.id !== sprintToDelete.id));
    setSprintToDelete(null);
    setIsDeleteSprintOpen(false);
    if (selectedSprint === sprintToDelete.id) setSelectedSprint(0);
  };

  const handleDeleteTask = async () => {
    try {
      await taskApi.delete(taskToDelete.id);
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
      setIsDeleteTaskOpen(false);
    } catch (err) {
      console.error(
        "❌ Failed to delete task:",
        err.response?.data || err.message
      );
    }
  };
  const statusDisplayMap = {
    NotStarted: "Not started",
    InProgress: "In progress",
    Completed: "Completed",
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const payload = {
        name: updatedTask.name,
        description: updatedTask.description,
        point: updatedTask.point,
        status: updatedTask.status,
        sprintId: updatedTask.sprint,
      };

      const email = updatedTask.assignee?.trim();
      const isEmail = email && email.includes("@");

      await taskApi.update(updatedTask.id, payload);

      if (isEmail) {
        console.log("📬 Calling claim API with email:", email);
        await taskApi.claim(updatedTask.id, email);
      }

      const taskRes = await taskApi.getByProjectId(id);
      const taskList = Array.isArray(taskRes.data) ? taskRes.data : [];
      setTasks(taskList);

      setIsEditTaskOpen(false);
    } catch (err) {
      console.error(
        "❌ Failed to update task:",
        err.response?.data || err.message
      );
    }
  };

  const getStatusColor = (status) => {
    const normalized = status?.replace(/([A-Z])/g, " $1").trim();
    switch (normalized) {
      case "Not Started":
        return "text-gray-400";
      case "In Progress":
        return "text-[#FFCC00]";
      case "Completed":
        return "text-[#4CC82D]";
      default:
        return "text-gray-600";
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 font-poppins text-xl">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center text-red-600 mt-20 text-lg">
        ❌ Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins px-4 py-4 sm:px-10 sm:py-6">
      {/* Breadcrumb */}
      <div className="text-md text-gray-400 font-poppins">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        {" > "}
        {fromPage === "dashboard" ? null : (
          <>
            <Link to="/projectlist" className="hover:underline">
              Project List
            </Link>
            {" > "}
          </>
        )}
        <span className="text-[#6837DE]">Project Detail</span>
      </div>

      {/* Header */}
      <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent">
        Project Details
      </h1>

      {/* Project Info */}
      <div className="mb-6 space-y-2">
        <p className="text-lg font-semibold text-gray-600">
          Project Name: <span>{project.name}</span>
        </p>
        <p className="text-lg font-semibold text-gray-600 flex items-center">
          Status:{" "}
          <span className={`ml-2 font-bold ${getStatusColor(project.status)}`}>
            {project.status?.replace(/([A-Z])/g, " $1") || "-"}
          </span>
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-lg font-semibold text-gray-600">Progress:</span>
          <div className="relative w-full sm:w-56 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6635D4]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-purple-700 font-semibold">{progress}%</span>
        </div>
      </div>

      {/* Search and Sprint Selector */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by task name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="md:w-1/3 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Listbox value={selectedSprint} onChange={setSelectedSprint}>
            <div className="relative">
              <Listbox.Button className="flex items-center justify-center gap-1 px-4 py-1 font-semibold bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white rounded-xl hover:opacity-90">
                {selectedSprint === 0
                  ? "All Sprint"
                  : sprints.find((s) => s.id === selectedSprint)?.name}
                <ChevronDown size={16} />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <Listbox.Option
                  value={0}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 text-sm ${
                      active ? "bg-purple-100 text-purple-700" : "text-gray-700"
                    }`
                  }
                >
                  All Sprint
                </Listbox.Option>
                {sprints.map((s) => (
                  <Listbox.Option
                    key={s.id}
                    value={s.id}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 text-sm ${
                        active
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-700"
                      }`
                    }
                  >
                    {s.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <img
            src={EditIcon}
            alt="Edit Sprint"
            onClick={() => setIsEditSprintOpen(true)}
            className="w-6 h-6 cursor-pointer hover:opacity-80"
          />
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-5 py-1 bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Task Name</th>
              <th className="px-4 py-3 text-left font-semibold">Sprint</th>
              <th className="px-4 py-3 text-left font-semibold">Point</th>
              <th className="px-4 py-3 text-left font-semibold">Assigned</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td
                  className="px-4 py-3 text-[#606060] underline cursor-pointer font-semibold"
                  onClick={() => {
                    setCurrentTask(task);
                    setIsEditTaskOpen(true);
                  }}
                >
                  {task.name}
                </td>
                <td className="px-4 py-3 text-[#606060]">
                  {sprints.find(
                    (s) => s.id === task.sprint?.id || s.id === task.sprintId
                  )?.name ||
                    `Sprint ${task.sprintId || task.sprint?.id || "-"}`}
                </td>
                <td className="px-4 py-3 font-semibold text-[#606060]">
                  {task.point}
                </td>
                <td className="px-4 py-3 font-semibold text-[#606060]">
                  {task.assignee?.email || "-"}
                </td>
                <td className="px-4 py-3 font-semibold whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === "Completed"
                        ? "bg-[#63D347] text-white"
                        : task.status === "InProgress"
                        ? "bg-[#FFCC00] text-white"
                        : "bg-[#D9D9D9] text-[#606060]"
                    }`}
                  >
                    {statusDisplayMap[task.status] || task.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Trash2
                    size={18}
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setTaskToDelete(task);
                      setIsDeleteTaskOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        {/* Previous */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 text-sm border rounded-md ${
              currentPage === index + 1
                ? "bg-[#6837DE] text-white border-[#6837DE]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Popups */}
      {isAddOpen && (
        <AddTaskPopup
          sprints={sprints}
          onSave={handleAddTask}
          onClose={() => setIsAddOpen(false)}
        />
      )}
      {isEditTaskOpen && currentTask && (
        <EditTaskPopup
          task={currentTask}
          sprints={sprints}
          onSave={handleTaskUpdate}
          onClose={() => setIsEditTaskOpen(false)}
        />
      )}
      {isEditSprintOpen && (
        <EditSprintPopup
          sprints={sprints}
          setSprints={setSprints}
          onOpenDeleteDialog={(s) => {
            setSprintToDelete(s);
            setIsDeleteSprintOpen(true);
          }}
          onClose={() => setIsEditSprintOpen(false)}
        />
      )}
      {isDeleteSprintOpen && (
        <DeleteSprintDialog
          open={isDeleteSprintOpen}
          onConfirm={handleDeleteSprint}
          onCancel={() => setIsDeleteSprintOpen(false)}
        />
      )}
      {isDeleteTaskOpen && (
        <Dialog
          open={isDeleteTaskOpen}
          onClose={() => setIsDeleteTaskOpen(false)}
          className="fixed inset-0 z-50"
        >
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative">
              <button
                onClick={() => setIsDeleteTaskOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <h2 className="font-poppins text-xl font-bold text-center bg-gradient-to-r from-[#4E1C8B] to-[#8730F1] bg-clip-text text-transparent mb-4">
                Confirm Delete
              </h2>
              <p className="font-poppins text-center text-gray-700 mb-6">
                Are you sure you want to delete this task?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteTask}
                  className="font-semibold border border-[#7825D1] bg-[#7947F5] hover:opacity-90 text-white font-poppins px-8 py-1 rounded-lg shadow"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteTaskOpen(false)}
                  className="border border-[#BBB4B4] font-semibold text-[#6838DE] hover:bg-gray-100 font-poppins px-8 py-1 rounded-lg shadow"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default ProjectDetail;
