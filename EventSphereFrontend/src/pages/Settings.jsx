import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialFormData = {
    name: user?.name || "",
    email: user?.email || "",
    notificationsEnabled: user?.notificationsEnabled || true,
    theme: user?.theme || "light",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser({ ...formData });
    setSuccess("Profile information updated successfully!");
    setError("");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirmation do not match!");
      setSuccess("");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters!");
      setSuccess("");
      return;
    }
    // Simulated password change logic (replace with actual API call)
    setSuccess("Password changed successfully!");
    setError("");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h3 className=" fw-bold mb-4">
            <i className="bi bi-gear-fill me-2"></i>Account Settings
          </h3>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show mb-4"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {success && (
            <div
              className="alert alert-success alert-dismissible fade show mb-4"
              role="alert"
            >
              {success}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header">
              <i className="bi bi-person-circle me-2"></i>Personal Information
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdateProfile}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="notificationsEnabled"
                    name="notificationsEnabled"
                    checked={formData.notificationsEnabled}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="notificationsEnabled"
                  >
                    Receive notifications
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-save me-2"></i>Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header">
              <i className="bi bi-lock-fill me-2"></i>Change Password
            </div>
            <div className="card-body">
              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  <i className="bi bi-key-fill me-2"></i>Update Password
                </button>
              </form>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <i className="bi bi-brush-fill me-2"></i>Appearance
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="theme" className="form-label">
                  Theme
                </label>
                <select
                  className="form-select"
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  updateUser({ theme: formData.theme });
                  setSuccess("Theme updated successfully!");
                  setTimeout(() => setSuccess(""), 3000);
                }}
              >
                <i className="bi bi-check2-all me-2"></i>Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;