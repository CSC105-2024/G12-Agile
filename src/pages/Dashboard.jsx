import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="w-full text-center mt-5">
          <span className="inline-block bg-gradient-to-r from-[#693F85] to-[#B26BE1] bg-clip-text text-transparent text-3xl font-bold">
            Dashboard
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-30 bg-gradient-to-r from-[#6837DE] to-purple-700 text-white py-4 mt-10">
        <div className="text-sm font-poppins ml-2 text-center font-bold">
          <p>This is Footer</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
