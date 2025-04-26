import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

function EditSprintPopup({ sprints, setSprints, onOpenDeleteDialog, onClose }) {
  const [local, setLocal] = useState([]);

  useEffect(() => {
    if (sprints.length === 0) {
      setLocal([
        {
          id: Date.now(),
          name: "Sprint 1",
          start: "",
          end: "",
          expectedPoints: 0,
          duration: "2 week",
        },
      ]);
    } else {
      setLocal([...sprints]);
    }
  }, [sprints]);

  const handleUpdate = () => {
    setSprints(local);
    onClose();
  };

  const handleChange = (id, field, value) => {
    setLocal((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addSprint = () => {
    const sprintNumbers = local.map((s) => {
      const parts = s.name.split(" ");
      return parseInt(parts[1] || "0", 10);
    });
    const maxNumber = sprintNumbers.length > 0 ? Math.max(...sprintNumbers) : 0;
    const nextNumber = maxNumber + 1;
    const newSprint = {
      id: Date.now(),
      name: `Sprint ${nextNumber}`,
      start: "",
      end: "",
      expectedPoints: 0,
      duration: "1 week",
    };
    setLocal((prev) => [...prev, newSprint]);
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" />

      {/* Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-[700px] max-h-[80vh] overflow-y-auto shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-center font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent mb-6">
            Edit Sprint
          </h2>

          <table className="w-full text-sm font-poppins text-gray-600 mb-4 border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Sprint</th>
                <th className="p-2">Start</th>
                <th className="p-2">End</th>
                <th className="p-2">Expected Points</th>
                <th className="p-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {local.map((sprint, index) => (
                <tr key={sprint.id} className="border-t border-gray-300 hover:bg-gray-50 transition">
                  <td className="p-2">{sprint.name}</td>
                  <td className="p-2">
                    <input
                      type="date"
                      className="px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={sprint.start}
                      onChange={(e) => handleChange(sprint.id, "start", e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="date"
                      className="px-2 py-1 w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                      value={sprint.end}
                      readOnly
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={sprint.expectedPoints}
                      onChange={(e) => handleChange(sprint.id, "expectedPoints", e.target.value)}
                    />
                  </td>
                  <td className="p-2 flex items-center gap-2">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                      value={sprint.duration}
                      onChange={(e) => handleChange(sprint.id, "duration", e.target.value)}
                    >
                      {["1 week", "2 week", "3 week", "4 week", "1 month"].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => onOpenDeleteDialog(sprint)}
                      className="text-gray-500 hover:text-gray-700 text-lg"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-6">
            <button
              onClick={addSprint}
              className="bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white px-4 py-1 rounded-lg font-semibold font-poppins hover:opacity-90"
            >
              + Sprints
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleUpdate}
              className="font-semibold border border-[#7825D1] bg-[#7947F5] text-white px-8 py-1 rounded-lg shadow hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="border border-[#BBB4B4] font-semibold text-[#6838DE] hover:bg-gray-100 px-8 py-1 rounded-lg shadow"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default EditSprintPopup;
