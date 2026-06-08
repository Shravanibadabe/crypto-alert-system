import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const register = async () => {

    try {

      setLoading(true);

      await API.post(
        "/api/v1/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(
        "Registration Successful. Please Login."
      );

      navigate("/");

    } catch(err) {

      alert(
        err?.response?.data?.detail ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-page">

      <div className="glass-card">

        <h2 className="mb-4 text-center">
          Create Account
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e)=>
            setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={register}
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <div className="text-center mt-3">

          <Link
            to="/"
            className="text-white"
          >
            Already have an account? Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;