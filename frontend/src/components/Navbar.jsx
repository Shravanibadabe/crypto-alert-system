import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">

      <h4 className="text-white">
        Crypto Alert System
      </h4>

      <div>

        <Link
          className="btn btn-outline-light me-2"
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="btn btn-outline-light me-2"
          to="/products"
        >
          Products
        </Link>

        <Link
          className="btn btn-outline-light me-2"
          to="/profile"
        >
          Profile
        </Link>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;