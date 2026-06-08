import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const login = async () => {

    try {

      setLoading(true);

      const res = await API.post(
        "/api/v1/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      localStorage.setItem(
        "email",
        res.data.email
      );

      navigate("/dashboard");

    } catch(err) {

      alert(
        err?.response?.data?.detail ||
        "Invalid Credentials"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-page">

      <div className="glass-card">

        <h2 className="mb-4 text-center">
          Welcome Back
        </h2>

        <input
          type="email"
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
          className="btn btn-primary w-100"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div className="text-center mt-3">

          <Link
            to="/register"
            className="text-white"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;