import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

const SprintModal = ({
  open,
  onClose,
  sprints,
  setSprints,
  handleSprintChange,
  addSprintRow,
  deleteSprintRow,
  onUpdateSprintCount,
}) => {
  const [errors, setErrors] = useState([]);
  const [NoSprintError, setNoSprintError] = useState("");

  useEffect(() => {
    if (open) {
      setErrors([]);
      setNoSprintError("");
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    let valid = true;
    setNoSprintError("");

    if (sprints.length === 0) {
      setNoSprintError("At least one sprint is required.");
      return false;
    }

    const newErrors = sprints.map((sprint) => {
      const sprintError = {};
      if (!sprint.start) sprintError.start = "Start date is required";
      if (!sprint.points) sprintError.points = "Points are required";
      if (!sprint.duration) sprintError.duration = "Duration is required";
      return sprintError;
    });

    setErrors(newErrors);
    valid = newErrors.every((err) => Object.keys(err).length === 0);
    return valid;
  };

  const handleSave = () => {
    if (validate()) {
      onUpdateSprintCount(sprints.length);
      onClose();
    }
  };

  const handleAdd = () => {
    addSprintRow();
    onUpdateSprintCount(sprints.length + 1);
  };

  const handleDelete = (index) => {
    deleteSprintRow(index);
    onUpdateSprintCount(sprints.length - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[700px] max-h-[80vh] overflow-y-auto shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent mb-6">
          Create Sprint
        </h2>

        {NoSprintError && (
          <div className="text-red-500 text-sm mb-3">{NoSprintError}</div>
        )}

        <table className="w-full text-sm font-poppins text-gray-600 mb-4 border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Sprint</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
              <th className="p-2">Expected points</th>
              <th className="p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {sprints.map((sprint, index) => (
              <tr key={index} className="border-t border border-gray-300 hover:bg-gray-50 transition">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <input
                    type="date"
                    className="px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={sprint.start}
                    onChange={(e) => handleSprintChange(index, "start", e.target.value)}
                  />
                  {errors[index]?.start && (
                    <p className="text-red-500 text-xs mt-1">{errors[index].start}</p>
                  )}
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
                    className="border border-gray-300 rounded px-2 py-1 w-35 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={sprint.points}
                    onChange={(e) => handleSprintChange(index, "points", e.target.value)}
                  />
                  {errors[index]?.points && (
                    <p className="text-red-500 text-xs mt-1">{errors[index].points}</p>
                  )}
                </td>
                <td className="p-2 flex items-center gap-2">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 appearance-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={sprint.duration}
                    onChange={(e) => handleSprintChange(index, "duration", e.target.value)}
                  >
                    {["1 week", "2 week", "3 week", "4 week", "1 month"].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-gray-500 hover:text-gray-700 text-lg"
                  >
                    &times;
                  </button>
                  {errors[index]?.duration && (
                    <p className="text-red-500 text-xs mt-1">{errors[index].duration}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white px-4 py-1 rounded-lg font-semibold font-poppins hover:opacity-90"
          >
            + Sprints
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="font-semibold border border-[#7825D1] bg-[#7947F5] text-white px-8 py-1 rounded-lg shadow hover:opacity-90"
            onClick={handleSave}
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
  );
};

export default SprintModal;
