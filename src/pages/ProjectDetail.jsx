import React, { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import AddTaskPopup from "../components/AddTaskPopup";
import EditTaskPopup from "../components/EditTaskPopup";
import EditSprintPopup from "../components/EditSprintPopup";
import DeleteSprintDialog from "../components/DeleteSprintDialog";


export default function ProjectDetail() {
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([
    { id: 1, name: "Sprint 1", start: "2033-01-01", end: "2033-01-08", expectedPoints: 20, duration: "1 week" },
    { id: 2, name: "Sprint 2", start: "2033-02-02", end: "2033-03-02", expectedPoints: 30, duration: "1 month" },
  ]);
  const [selectedSprint, setSelectedSprint] = useState(1);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isEditSprintOpen, setIsEditSprintOpen] = useState(false);
  const [isDeleteSprintOpen, setIsDeleteSprintOpen] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [sprintToDelete, setSprintToDelete] = useState(null);

  const handleAddTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now() }]);
    setIsAddOpen(false);
  };

  const handleDeleteSprint = () => {
    setSprints(prev => prev.filter(s => s.id !== sprintToDelete.id));
    setSprintToDelete(null);
    setIsDeleteSprintOpen(false);
    setIsEditSprintOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-10">
      {/* Sprint Button */}
      <div className="flex items-center gap-2 mb-6">
        <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg flex items-center gap-2">
          {sprints.find(s => s.id === selectedSprint)?.name || "Sprint 1"}
          <ChevronDown size={16} />
        </button>
        <Pencil size={20} onClick={() => setIsEditSprintOpen(true)} className="text-purple-500 cursor-pointer" />
      </div>

      {/* Add Task Button */}
      <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg mb-8">
        + Add Task
      </button>

      {/* Tasks Table */}
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-4xl border">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Task Name</th>
                <th className="py-2">Sprint</th>
                <th className="py-2">Point</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td
                    className="py-2 text-purple-600 underline cursor-pointer"
                    onClick={() => {
                      setCurrentTask(task);
                      setIsEditTaskOpen(true);
                    }}
                  >
                    {task.name}
                  </td>
                  <td className="py-2">{sprints.find(s => s.id === task.sprint)?.name || "-"}</td>
                  <td className="py-2">{task.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Popups */}
      {isAddOpen && <AddTaskPopup sprints={sprints} onSave={handleAddTask} onClose={() => setIsAddOpen(false)} />}
      {isEditTaskOpen && <EditTaskPopup task={currentTask} onClose={() => setIsEditTaskOpen(false)} />}
      {isEditSprintOpen && (
        <EditSprintPopup
          sprints={sprints}
          setSprints={setSprints}
          onDelete={(sprint) => {
            setSprintToDelete(sprint);
            setIsDeleteSprintOpen(true);
          }}
          onClose={() => setIsEditSprintOpen(false)}
        />
      )}
      {isDeleteSprintOpen && (
        <DeleteSprintDialog onConfirm={handleDeleteSprint} onCancel={() => setIsDeleteSprintOpen(false)} />
      )}
    </div>
  );
}
