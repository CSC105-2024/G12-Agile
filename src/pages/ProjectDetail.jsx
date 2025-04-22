import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";

export default function ProjectDetail() {
  const [tasks, setTasks] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentSprint, setCurrentSprint] = useState(1);
  const [newTask, setNewTask] = useState({ name: "", assignee: "", status: "", sprint: 1, point: 1 });

  useEffect(() => {
    axios.get("/api/tasks")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTasks(data);
      })
      .catch(() => {
        setTasks([
          { id: 1, name: "Task Name", sprint: 1, point: 3, assignee: "Dev.N", status: "Completed" },
          { id: 2, name: "Task Name", sprint: 1, point: 4, assignee: "Dev.V", status: "In progress" },
          { id: 3, name: "Task Name", sprint: 1, point: 5, assignee: "Dev.V", status: "In progress" },
          { id: 4, name: "Task Name", sprint: 1, point: 4, assignee: "Dev.J", status: "Not started" },
        ]);
      });
  }, []);

  const addTask = () => {
    const taskWithId = { ...newTask, id: Date.now() };
    setTasks([...tasks, taskWithId]);
    setNewTask({ name: "", assignee: "", status: "", sprint: 1, point: 1 });
    setIsAddOpen(false);
  };

  const openDetail = (task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-10 bg-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Project Details</h1>

      <div className="mb-6">
        <p className="text-lg font-semibold">Project Name : <span className="text-gray-700">Agile</span></p>
        <p className="text-lg font-semibold">Status : <span className="text-yellow-500 font-semibold">In Progress</span></p>
        <div className="flex items-center mt-2">
          <span className="text-lg font-semibold mr-2">Progress :</span>
          <div className="relative w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-4 bg-purple-600" style={{ width: "70%" }} />
          </div>
          <span className="ml-2 text-purple-700 font-semibold">70 %</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by task name"
          className="w-1/3 px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none"
        />
        <div className="flex gap-2 items-center">
          <select className="px-4 py-2 rounded-xl border border-gray-300 text-sm shadow-sm focus:ring-2 focus:ring-purple-500">
            <option>Sprint 1</option>
            <option>Sprint 2</option>
          </select>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition text-sm"
          >
            + Add Task
          </button>
        </div>
      </div>

      <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-2">Task Name</th>
            <th className="px-4 py-2">Sprint</th>
            <th className="px-4 py-2">Point</th>
            <th className="px-4 py-2">Assigned</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2 underline text-purple-700 cursor-pointer" onClick={() => openDetail(task)}>{task.name}</td>
              <td className="px-4 py-2">{task.sprint}</td>
              <td className="px-4 py-2">{task.point}</td>
              <td className="px-4 py-2">{task.assignee}</td>
              <td className="px-4 py-2">
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "In progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <button className="text-gray-500 hover:text-red-500">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-600">
        <p>Achieved points : 10</p>
        <p>Expected points : 20</p>
      </div>

      <div className="mt-4 flex justify-center gap-2 text-sm">
        <button className="px-2 py-1 rounded bg-gray-200 text-purple-600">‹</button>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            className={`px-3 py-1 rounded ${n === 1 ? "bg-purple-600 text-white" : "bg-gray-100"}`}
          >
            {n}
          </button>
        ))}
        <button className="px-2 py-1 rounded bg-gray-200 text-purple-600">›</button>
      </div>

      <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-[400px]">
            <Dialog.Title className="text-lg font-medium mb-4">Add Task</Dialog.Title>
            <div className="space-y-3">
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Task Name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Assignee" value={newTask.assignee} onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded-md" placeholder="Status" value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} />
              <input className="w-full border px-3 py-2 rounded-md" type="number" placeholder="Sprint" value={newTask.sprint} onChange={(e) => setNewTask({ ...newTask, sprint: parseInt(e.target.value) })} />
              <input className="w-full border px-3 py-2 rounded-md" type="number" placeholder="Point" value={newTask.point} onChange={(e) => setNewTask({ ...newTask, point: parseInt(e.target.value) })} />
              <div className="flex justify-end mt-4 gap-2">
                <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button onClick={addTask} className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">Add</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={isDetailOpen} onClose={() => setIsDetailOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-xl w-[400px]">
            <Dialog.Title className="text-lg font-medium mb-4">Task Detail</Dialog.Title>
            {selectedTask && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedTask.name}</p>
                <p><strong>Assignee:</strong> {selectedTask.assignee}</p>
                <p><strong>Status:</strong> {selectedTask.status}</p>
                <p><strong>Sprint:</strong> {selectedTask.sprint}</p>
                <p><strong>Point:</strong> {selectedTask.point}</p>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsDetailOpen(false)} className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">Close</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
