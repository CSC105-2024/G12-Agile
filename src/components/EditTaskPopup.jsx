import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditTaskPopup({ task, onSave, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [point, setPoint] = useState("");
  const [sprint, setSprint] = useState("");
  const [status, setStatus] = useState("Not started");

  // Error state
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (task) {
      setTaskName(task.name || "");
      setDescription(task.description || "");
      setAssignee(task.assignee || "");
      setPoint(task.point !== undefined ? task.point : "");
      setSprint(task.sprint !== undefined ? task.sprint : "");
      setStatus(task.status || "Not started");
      setErrors({});
    }
  }, [task]);

  // Validation
  const handleSave = () => {
    const newErrors = {};

    if (!taskName.trim()) newErrors.taskName = "Task name is required";
    if (!description.trim()) newErrors.description = "Task description is required";
    if (!assignee.trim()) newErrors.assignee = "Assignee is required";
    if (point === "" || isNaN(point)) newErrors.point = "Point is required";
    if (sprint === "" || isNaN(sprint)) newErrors.sprint = "In Sprint is required";
    if (!status.trim()) newErrors.status = "Status is required";


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedTask = {
      ...task,
      name: taskName,
      description,
      assignee,
      point: Number(point),
      sprint: Number(sprint),
      status,
    };

    if (typeof onSave === "function") {
      onSave(updatedTask);
    }
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" />

      {/* Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] p-6 w-full max-w-lg shadow-lg relative">
          {/* Close Button */}
          <button onClick={onClose} type="button" className="absolute top-6 right-6 text-gray-500">
            <X size={32} />
          </button>

          {/* Title */}
          <h3 className="text-2xl text-center mt-3 mb-5 font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent font-bold">
            Edit Task
          </h3>

          <div className="space-y-6">
            {/* Task Name */}
            <div>
              <label className="block text-lg font-poppins font-semibold text-gray-500 mb-2">
                Task name
              </label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.taskName && (
                <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
              )}
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-lg font-poppins font-semibold text-gray-500 mb-2">
                Task description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-lg text-poppins font-semibold text-gray-500 mb-2">
                Assignee
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.assignee && (
                <p className="text-red-500 text-sm mt-1">{errors.assignee}</p>
              )}
            </div>

            {/* Field Group: Point, In Sprint, Status */}
            <div className="flex gap-4">
              {/* Point */}
              <div className="flex-1">
                <label className="block text-lg font-poppins font-semibold text-gray-500 mb-2">
                  Point
                </label>
                <input
                  type="number"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                {errors.point && (
                  <p className="text-red-500 text-sm mt-1">{errors.point}</p>
                )}
              </div>

              {/* In Sprint */}
              <div className="flex-1">
                <label className="block text-lg font-poppins font-semibold text-gray-500 mb-2">
                  In Sprint
                </label>
                <select
                  value={sprint}
                  onChange={(e) => setSprint(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                >
                  <option value="">Select In Sprint</option>
                  <option value={1}>Sprint 1</option>
                  <option value={2}>Sprint 2</option>
                  <option value={3}>Sprint 3</option>
                </select>
                {errors.sprint && (
                  <p className="text-red-500 text-sm mt-1">{errors.sprint}</p>
                )}
              </div>

              {/* Status */}
              <div className="flex-1">
                <label className="block font-poppins text-lg font-semibold text-gray-500 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                >
                  <option value="Not started">Not started</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>
            </div>
          </div>

          {/* Save / Cancel Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleSave}
              type="button"
              className="px-8 py-2 border border-[#7825D1] bg-[#7947F5] text-white rounded-xl font-semibold hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-2 border border-[#BBB4B4]  text-[#6838DE] rounded-xl font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
