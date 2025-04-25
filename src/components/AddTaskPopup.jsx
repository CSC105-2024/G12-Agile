import { Dialog } from "@headlessui/react";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

export default function AddTaskPopup({ sprints, onSave, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [taskSprint, setTaskSprint] = useState(sprints[0]?.id || null);
  const [point, setPoint] = useState("");

  const handleAdd = () => {
    if (!taskName || !taskSprint || !point) return;
    onSave({ name: taskName, sprint: taskSprint, point: parseInt(point) });
    setTaskName("");
    setPoint("");
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-[40px] p-8 w-full max-w-xl shadow-lg">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500">
            <X size={32} />
          </button>

          <h3 className="text-2xl font-bold text-center mb-8 text-purple-600">Add Task</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-500 mb-2">Task name</label>
              <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-lg font-semibold text-gray-500 mb-2">To Sprint</label>
                <div className="relative">
                  <select
                    value={taskSprint}
                    onChange={(e) => setTaskSprint(parseInt(e.target.value))}
                    className="w-full border-2 border-gray-300 rounded-xl p-3 appearance-none"
                  >
                    {sprints.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600" />
                </div>
              </div>

              <div className="w-24">
                <label className="block text-lg font-semibold text-gray-500 mb-2">Point</label>
                <input
                  type="number"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button onClick={onClose} className="px-6 py-2 border-2 border-gray-400 rounded-full text-gray-700 font-semibold">
              Cancel
            </button>
            <button onClick={handleAdd} className="px-8 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
