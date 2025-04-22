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
      <Link to="/projectdetail" className="text-xl font-bold px-10">
      Go to Project Detail Page
      </Link>
    </div>
  );
};
export default ProjectList;