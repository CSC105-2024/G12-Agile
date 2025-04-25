import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function EditTaskPopup({ task, onClose }) {
  if (!task) return null;

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
            <X size={28} />
          </button>
          <h2 className="text-xl font-bold text-purple-600 mb-6">Edit Task</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Task Name:</p>
              <p className="text-lg text-gray-800">{task.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Point:</p>
              <p className="text-lg text-gray-800">{task.point}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Sprint ID:</p>
              <p className="text-lg text-gray-800">{task.sprint}</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
