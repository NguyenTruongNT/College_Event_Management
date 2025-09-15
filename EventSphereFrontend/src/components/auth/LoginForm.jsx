import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = await login(email, password);
    navigate(
      role === "admin"
        ? "/dashboard/admin"
        : role === "organizer"
          ? "/dashboard/organizer"
          : "/dashboard/student"
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 ">
      <div
        className="card shadow-sm"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "15px" }}
      >
        <div className="card-header text-center bg-light">
          <i
            className="bi bi-calendar-event text-primary"
            style={{ fontSize: "30px" }}
          ></i>
          <h2 className="card-title mb-0">EventSphere</h2>
          <p className="card-text text-muted">Login to your account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              style={{
                background: "linear-gradient(to right, #3b5998, #4c6ef5)",
                border: "none",
              }}
            >
              → Login
            </button>
          </form>
          <p className="text-center mt-3 text-muted">
            Don't have an account?{" "}
            <a href="/register" className="text-primary">
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
