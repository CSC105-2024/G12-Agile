import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="font-poppins flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#6838DE] to-[#A044FF] text-center font-poppins p-6">
      
      {/*404 */}
      <h1 className="text-[120px] md:text-[150px] font-extrabold text-white drop-shadow-2xl">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-md md:text-lg text-gray-200 mb-6 font-semibold">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/login")}
        className="border border-gray-300 px-6 py-3 bg-white text-[#6838DE] hover:bg-gray-100 hover:text-[#572BC0] font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out"
      >
        Back to Login
      </button>
    </div>
  );
};

export default NotFound;
