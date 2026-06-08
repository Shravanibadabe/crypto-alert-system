import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">

      <h3>Crypto Alert</h3>

      <Link to="/dashboard">
        <FaHome /> Dashboard
      </Link>

      <Link to="/products">
        <FaBoxOpen /> Products
      </Link>

      <Link to="/profile">
        <FaUser /> Profile
      </Link>

      <p className="role-badge">
        {role?.toUpperCase()}
      </p>

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar; 