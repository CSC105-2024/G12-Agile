import { Dialog } from "@headlessui/react";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function AddTaskPopup({ sprints, onSave, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [taskSprint, setTaskSprint] = useState(sprints[0]?.id || "");
  const [point, setPoint] = useState("");

  const [errors, setErrors] = useState({});

  const handleAdd = () => {
    const newErrors = {};
    if (!taskName.trim()) {
      newErrors.taskName = "Task name is required";
    }
    if (!description.trim()) {
      newErrors.description = "Task description is required";
    }
    if (!taskSprint) {
      newErrors.taskSprint = "Sprint selection is required";
    }
    if (!point.toString().trim()) {
      newErrors.point = "Point is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: taskName,
      description: description,
      sprint: taskSprint,
      point: parseInt(point)
    });

    // Reset
    setTaskName("");
    setDescription("");
    setTaskSprint(sprints[0]?.id || "");
    setPoint("");
    setErrors({});
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl p-8 w-full max-w-lg shadow-lg">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500">
            <X size={32} />
          </button>

          <h3 className="text-2xl text-center mb-8 font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent font-bold">Add Task</h3>

          <div className="space-y-6">
            {/* Task Name */}
            <div>
              <label className="block text-lg font-semibold text-gray-500 mb-2">
                Task name
              </label>
              <input
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  setErrors((prev) => ({ ...prev, taskName: "" }));
                }}
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.taskName && (
                <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
              )}
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-500 mb-2">
                Task description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: "" }));
                }}
                rows={3}
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Sprint and Point Fields */}
            <div className="flex gap-4">
              {/* Sprint */}
              <div className="flex-1">
                <label className="block text-lg font-semibold text-gray-500 mb-2">
                  To Sprint
                </label>
                <div className="relative">
                  <select
                    value={taskSprint}
                    onChange={(e) => {
                      setTaskSprint(parseInt(e.target.value));
                      setErrors((prev) => ({ ...prev, taskSprint: "" }));
                    }}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {sprints.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                </div>
                {errors.taskSprint && (
                  <p className="text-red-500 text-sm mt-1">{errors.taskSprint}</p>
                )}
              </div>

              {/* Point */}
              <div className="w-24">
                <label className="block text-lg font-semibold text-gray-500 mb-2">
                  Point
                </label>
                <input
                  type="number"
                  value={point}
                  onChange={(e) => {
                    setPoint(e.target.value);
                    setErrors((prev) => ({ ...prev, point: "" }));
                  }}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none"
                />
                {errors.point && (
                  <p className="text-red-500 text-sm mt-1">{errors.point}</p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleAdd}
              className="px-8 py-2  border border-[#7825D1] bg-[#7947F5] hover:opacity-90 text-white rounded-xl font-semibold hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={onClose}
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
