import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CreateProjectModal = ({
  open,
  onClose,
  setOpenCreateProjectModal,
  setOpenMemberModal,
  setOpenCreateSprintModal,
  setProjects,
  projects,
  members,
  setMembers,
  sprintCount,
  setSprints,
  setSprintCount,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setFormData({ name: "", description: "", startDate: "", endDate: "" });
      setErrors({});
      setMembers([]);
    }
  }, [open, setMembers]);

  if (!open) return null;

  const handleClose = () => {
    setErrors({});
    setMembers([]);
    setSprints([]);
    setSprintCount(0);
    onClose();
    setOpenCreateProjectModal(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Project name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      newErrors.dateOrder = "Start date cannot be later than end date";
    }
    if (members.length === 0) newErrors.members = "At least 1 member is required";
    if (sprintCount === 0) newErrors.sprints = "At least 1 sprint is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newProject = {
      ...formData,
      sprint: `0/${sprintCount}`,
      status: "Not started",
      pm: "You",
      dev: members.join(", "),
    };

    setProjects([...projects, newProject]);

    Swal.fire({
      icon: "success",
      title: "Project Created!",
      text: "Your project has been successfully created.",
      confirmButtonText: "Close",
      confirmButtonColor: "#6837DE",
      showCloseButton: true,
      allowOutsideClick: true,
      allowEscapeKey: true,
    }).then(() => {
      handleClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl w-[600px] shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center font-poppins bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent mb-6">
          Create Project
        </h2>
        <div className="space-y-4 font-poppins text-sm text-gray-600">
          <div>
            <label className="font-semibold block mb-1">Project name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="font-semibold block mb-1">Project description</label>
            <textarea
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold block mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="font-semibold block mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
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
          <div className="flex gap-4 mt-2">
            <button
              className="font-semibold bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white font-poppins px-5 py-1 rounded-lg hover:opacity-90 flex items-center gap-2"
              onClick={() => setOpenMemberModal(true)}
            >
              <span className="text-lg">+</span> Members
            </button>
            <button
              className="font-semibold bg-gradient-to-r from-[#3F2B96] to-[#A044FF] text-white font-poppins px-5 py-1 rounded-lg hover:opacity-90 flex items-center gap-2"
              onClick={() => setOpenCreateSprintModal(true)}
            >
              <span className="text-lg">+</span> Sprints
            </button>
          </div>
          {(errors.members || errors.sprints) && (
            <div className="text-red-500 text-sm mt-1 space-x-2">
              {errors.members && <span>{errors.members}</span>}
              {errors.sprints && <span>{errors.sprints}</span>}
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="font-semibold border border-[#7825D1] bg-[#7947F5] hover:opacity-90 text-white font-poppins px-8 py-1 rounded-xl shadow"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            onClick={handleClose}
            className="border border-[#BBB4B4] font-semibold text-[#6838DE] hover:bg-gray-100 font-poppins px-8 py-1 rounded-xl shadow"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
