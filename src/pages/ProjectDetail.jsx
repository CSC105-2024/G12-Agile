import React, { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { Listbox, Dialog } from "@headlessui/react";
import { useLocation, Link } from "react-router-dom";
import AddTaskPopup from "../components/AddTaskPopup";
import EditTaskPopup from "../components/EditTaskPopup";
import EditSprintPopup from "../components/EditSprintPopup";
import DeleteSprintDialog from "../components/DeleteSprintDialog";
import EditIcon from "../image/edit-246.png";

function ProjectDetail() {
  const location = useLocation();
  const fromPage = location.state?.from || "projectlist";

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Task 1",
      sprint: 1,
      point: 4,
      assignee: "Dev.V",
      status: "In progress",
    },
    {
      id: 2,
      name: "Task 2",
      sprint: 1,
      point: 5,
      assignee: "Dev.V",
      status: "In progress",
    },
    {
      id: 3,
      name: "Task 3",
      sprint: 2,
      point: 4,
      assignee: "Dev.J",
      status: "Not started",
    },
  ]);

  const [sprints, setSprints] = useState([
    {
      id: 1,
      name: "Sprint 1",
      start: "2033-01-01",
      end: "2033-01-08",
      expectedPoints: 20,
      duration: "1 week",
    },
    {
      id: 2,
      name: "Sprint 2",
      start: "2033-02-02",
      end: "2033-03-02",
      expectedPoints: 30,
      duration: "1 month",
    },
    {
      id: 3,
      name: "Sprint 3",
      start: "2033-04-01",
      end: "2033-04-08",
      expectedPoints: 25,
      duration: "1 week",
    },
    {
      id: 4,
      name: "Sprint 4",
      start: "2033-05-01",
      end: "2033-05-15",
      expectedPoints: 35,
      duration: "2 weeks",
    },
  ]);

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

  const tasksPerPage = 10;
  const filteredTasks = tasks.filter(
    (task) =>
      (selectedSprint === 0 || task.sprint === selectedSprint) &&
      task.name.toLowerCase().includes(searchQuery)
  );
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [
      ...prev,
      {
        ...newTask,
        id: Date.now(),
        assignee: "Unassigned",
        status: "Not started",
      },
    ]);
    setIsAddOpen(false);
  };

  const handleDeleteSprint = () => {
    if (!sprintToDelete) return;
    setSprints((prev) => prev.filter((s) => s.id !== sprintToDelete.id));
    setTasks((prev) => prev.filter((t) => t.sprint !== sprintToDelete.id));
    setSprintToDelete(null);
    setIsDeleteSprintOpen(false);
    if (selectedSprint === sprintToDelete.id) setSelectedSprint(ป0);
  };

  const handleDeleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
    setIsDeleteTaskOpen(false);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

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

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col min-h-[calc(100vh-160px)]">
        {/* Project Info */}
        <div className="mb-6 space-y-2">
          <p className="text-lg font-semibold text-gray-600">
            Project Name: <span>Agile</span>
          </p>
          <p className="text-lg font-semibold text-gray-600 flex items-center">
            Status:{" "}
            <span className="ml-2 font-bold text-yellow-500">In Progress</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-lg font-semibold text-gray-600">
              Progress:
            </span>
            <div className="relative w-full sm:w-56 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6635D4]"
                style={{ width: "70%" }}
              ></div>
            </div>
            <span className="text-purple-700 font-semibold">70%</span>
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
                        active
                          ? "bg-purple-100 text-purple-700"
                          : "text-gray-700"
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
                    {sprints.find((s) => s.id === task.sprint)?.name ||
                      task.sprint}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#606060]">
                    {task.point}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#606060]">
                    {task.assignee}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        task.status === "Completed"
                          ? "bg-[#63D347] text-white"
                          : task.status === "In progress"
                          ? "bg-[#FFCC00] text-white"
                          : "bg-[#D9D9D9] text-[#606060]"
                      }`}
                    >
                      {task.status}
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
    </div>
  );
}

export default ProjectDetail;
