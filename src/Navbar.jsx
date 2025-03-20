import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/projectlist">Project List</NavLink>
        <NavLink to="/projectdetail"></NavLink>
        <NavLink to="/activitylog">Activity Log</NavLink>
        <NavLink to="/accountsetting">Account Setting</NavLink>
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/login">Log out</NavLink>
        <NavLink to="/register">register</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;