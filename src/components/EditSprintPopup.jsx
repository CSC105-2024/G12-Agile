import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditSprintPopup({ sprints, setSprints, onDelete, onClose }) {
  const [local, setLocal] = useState([]);

  useEffect(() => {
    setLocal([...sprints]);
  }, [sprints]);

  const handleUpdate = () => {
    setSprints(local);
    onClose();
  };

  const handleChange = (id, field, value) => {
    setLocal(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
            <X size={28} />
          </button>
          <h2 className="text-xl font-bold text-purple-600 mb-4">Edit Sprint</h2>

          <table className="w-full text-sm border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Start</th>
                <th className="p-2 border">End</th>
                <th className="p-2 border">Expected Points</th>
                <th className="p-2 border">Duration</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {local.map((s) => (
                <tr key={s.id}>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={s.start}
                      onChange={(e) => handleChange(s.id, "start", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={s.end}
                      onChange={(e) => handleChange(s.id, "end", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={s.expectedPoints}
                      onChange={(e) => handleChange(s.id, "expectedPoints", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      value={s.duration}
                      onChange={(e) => handleChange(s.id, "duration", e.target.value)}
                      className="border p-1 rounded w-full"
                    >
                      <option>1 week</option>
                      <option>1 month</option>
                    </select>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => onDelete(s)}
                      className="text-red-600 hover:underline"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button onClick={handleUpdate} className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
