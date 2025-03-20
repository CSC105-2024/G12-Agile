import { NavLink, Link, Outlet } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center bg-gradient-to-r from-[#6837DE] to-purple-700 p-4 text-white">
        {/* Logo (Dashboard) */}
        <Link to="/dashboard" className="text-4xl font-monoton  hover:opacity-80 transition">
          A
        </Link>
        <Link to="/dashboard" className="text-2xl font-extrabold font-poppins hover:opacity-80 transition">
          GILE
        </Link>
        
        {/* Navigation Links*/}
        <div className="flex items-center space-x-6 ml-auto">
          <NavLink to="/projectlist" className="hover:underline font-bold font-poppins">
            Projects
          </NavLink>
          <NavLink to="/activitylog" className="hover:underline font-bold font-poppins">
            Activity Log
          </NavLink>

          {/* Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white text-[#6837DE] px-4 py-2 rounded-lg font-bold font-poppins"
            >
              Account
            </button>
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white text-gray-800 shadow-lg border border-gray-300 rounded-lg w-48">
                <NavLink to="/accountsetting" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold font-poppins">
                  Account Settings
                </NavLink>
                <NavLink to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-poppins font-semibold">
                  Log out
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
