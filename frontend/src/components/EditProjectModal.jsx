import { useState, useEffect } from "react";
import whiteEdit from "../image/whiteEdit.png";

const EditProjectModal = ({
  open,
  onClose,
  project,
  setOpenMemberModal,
  onDelete,
  onSave,
  members,
  setMembers,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setProjectName(project.name || "");
      setProjectDesc(project.description || "");
      setStartDate(project.startDate || "");
      setEndDate(project.endDate || "");
      setMembers(
        project.dev ? project.dev.split(",").map((dev) => dev.trim()) : []
      );
      setErrors({});
    }
  }, [project, setMembers]);

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.name = "Project name is required";
    if (!projectDesc) newErrors.description = "Description is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.dateOrder = "Start date cannot be later than end date";
    }
    if (members.length === 0) newErrors.members = "At least 1 member";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const updatedProject = {
      ...project,
      name: projectName,
      description: projectDesc,
      startDate,
      endDate,
      dev: members.join(", "), 
      members,
    };
    onSave(updatedProject);
    onClose();
  };

  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-3xl w-[600px] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent mb-6">
          Edit Project
        </h2>
        <div className="space-y-4 font-poppins text-gray-600 text-sm">
          <div>
            <label className="block mb-1 text-gray-600 font-semibold">
              Project name
            </label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-semibold">
              Project description
            </label>
            <textarea
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-gray-600 font-semibold">
                Start Date
              </label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-gray-600 font-semibold">
                End Date
              </label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
          {errors.dateOrder && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOrder}</p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <div className="flex flex-col gap-3">
            <button
              className="font-semibold bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white font-poppins px-5 py-1 rounded-lg hover:opacity-90 flex items-center gap-2"
              onClick={() => setOpenMemberModal(true)}
            >
              Members
              <img
                src={whiteEdit}
                alt="Edit Members Icon"
                className="w-4 h-4"
              />
            </button>
            {errors.members && (
              <p className="text-red-500 text-sm mt-1">{errors.members}</p>
            )}
            <button
              className="border border-[#FF0B0F] bg-[#FA290E] hover:bg-red-600 text-white font-poppins font-semibold px-6 py-1 rounded-lg"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
          <div className="mt-10 flex flex-row justify-center gap-3">
            <button
              className="font-semibold border border-[#7825D1] bg-[#7947F5] hover:opacity-90 text-white font-poppins px-6 py-1 rounded-lg w-27 h-9 shadow"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="border border-[#BBB4B4] font-semibold text-[#6838DE] hover:bg-gray-100 font-poppins px-6 py-2 rounded-lg w-27 h-9 shadow"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
