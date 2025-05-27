import { useNavigate } from "react-router-dom";
import EditIcon from "../image/edit-246.png";

const ProjectTable = ({ projects, getStatusColor, handleEditClick, }) => {
  const getDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end - today;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff > 0) {
      return { text: `${dayDiff} days left`, color: "text-gray-400" };
    } else if (dayDiff === 0) {
      return { text: "Deadline today!", color: "text-red-500" };
    } else {
      return { text: `Overdue by ${Math.abs(dayDiff)} days`, color: "text-red-500" };
    }
  };

  const navigate = useNavigate();
  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`, {
      state: { from: 'projectlist' } 
    });
  };
  
  return (
    <div className="mx-9 mt-6">
      <div className="rounded-xl border border-gray-300 shadow-sm">
        <table className="w-full table-fixed text-md text-[#606060]">
          <thead className="border-b border-gray-300">
            <tr className="font-poppins">
              <th className="text-left px-4 py-3 text-xl">Project</th>
              <th className="text-center px-4 py-3 text-xl">Sprints</th>
              <th className="text-center px-4 py-3 text-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj, index) => {
               console.log("Project dev:", proj.dev);
              const { text, color } = getDaysLeft(proj.endDate);
              return (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-poppins">
                    <button
                      onClick={() => handleProjectClick(proj)}
                      className="text-purple-700 hover:underline cursor-pointer text-base font-semibold bg-transparent p-0"
                    >
                      {proj.name}
                    </button>
                    <div className="text-md text-gray-600">{proj.description}</div>
                    <div className="text-md text-gray-600 mt-1">
                      <span className="font-poppins">PM:</span> {proj.pm}
                    </div>
                    <div className="text-md text-gray-600">
                    <span className="font-poppins">Dev:</span> {proj.dev}
                    </div>
                    <div className={`text-md mt-1 ${color}`}>
                      {text}
                    </div>
                  </td>

                  <td className="text-center px-4 py-4 font-poppins">{proj.sprint}</td>

                  <td className="px-3 py-4 font-poppins relative">
                    <div className="flex justify-center">
                      <span className={`font-poppins px-3 py-1 rounded-full whitespace-nowrap min-w-[100px] text-center ${getStatusColor(proj.status)}`}>
                        {proj.status}
                      </span>
                    </div>
                    <div className="flex justify-center mt-2 md:hidden">
                      <button
                        onClick={() => handleEditClick(proj)}
                        className="hover:scale-110 transition-transform"
                      >
                        <img src={EditIcon} alt="Edit" className="w-8 h-8" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleEditClick(proj)}
                      className="hidden md:block absolute right-8 md:right-3 lg:right-5 xl:right-18 top-1/2 -translate-y-1/2"
                    >
                      <img src={EditIcon} alt="Edit" className="w-8 h-8 hover:scale-110 transition-transform" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
