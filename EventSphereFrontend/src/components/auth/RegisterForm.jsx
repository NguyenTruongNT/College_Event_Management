import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enrollmentNo: "",
    departmentId: "",
    password: "",
    confirmPassword: "",
    roleId: 3 // Default: Student
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const departmentOptions = [
    { id: 1, name: "Information Technology" },
    { id: 2, name: "Accounting" },
    { id: 3, name: "Business Administration" },
    { id: 4, name: "Foreign Languages" },
    { id: 5, name: "Other" }
  ];

  const availableRoles = [
    { RoleId: 1, RoleName: "Admin" },
    { RoleId: 2, RoleName: "Organizer" },
    { RoleId: 3, RoleName: "Student" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!formData.roleId) {
      setError("Please select a role");
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        departmentId: formData.departmentId ? parseInt(formData.departmentId) : 0,
        enrollmentNo: formData.enrollmentNo,
        roleId: parseInt(formData.roleId),
        phone: formData.phone
      };

      console.log("Submitting data:", submitData);

      const result = await register(submitData);

      if (result.success) {
        setSuccess(result.message || "Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const getRoleDescription = (roleId) => {
    const role = availableRoles.find(r => r.RoleId === parseInt(roleId));
    return role ? role.RoleName : "No role selected";
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow-sm"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}
      >
        <div className="card-header text-center bg-light">
          <h2 className="card-title mb-0">Register Account</h2>
          <p className="card-text text-muted">Create a new account</p>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              {success}
              <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <h5 className="mb-3">Personal Information</h5>

                {/* Full Name + Phone */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <input
                      name="fullName"
                      className="form-control"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      name="phone"
                      className="form-control"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Enrollment No + Email */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="enrollmentNo" className="form-label">Enrollment No *</label>
                    <input
                      name="enrollmentNo"
                      className="form-control"
                      id="enrollmentNo"
                      value={formData.enrollmentNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Department + Role */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="departmentId" className="form-label">Department *</label>
                    <select
                      name="departmentId"
                      className="form-select"
                      id="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departmentOptions.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="roleId" className="form-label">Role *</label>
                    <select
                      name="roleId"
                      className="form-select"
                      id="roleId"
                      value={formData.roleId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {availableRoles.map(role => (
                        <option key={role.RoleId} value={role.RoleId}>
                          {role.RoleName}
                        </option>
                      ))}
                    </select>
                    <small className="text-muted">Selected: {getRoleDescription(formData.roleId)}</small>
                  </div>
                </div>

                {/* Password + Confirm */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password *</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #3b5998, #4c6ef5)",
                border: "none",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Processing...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Register
                </>
              )}
            </button>
          </form>
          <p className="text-center mt-3 text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
