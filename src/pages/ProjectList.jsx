import { Link, useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <div className="w-full text-center mt-8">
        <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
          Project List
        </span>
      </div>
      
      {/* Search Bar */}
      <div className=" mt-5 ml-9">
        <input
          type="text"
          placeholder="Search by project name"
          className=" font-poppins placeholder-gray-300 w-110 h-9 p-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
      </div>
    </div>
  );
};
export default ProjectList;