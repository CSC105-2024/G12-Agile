import { Link, useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Project List Page</div>
      <Link to="/projectdetail">Go to Project Detail page</Link>
    </>
  );
};

export default ProjectList;