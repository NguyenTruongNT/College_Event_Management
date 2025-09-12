import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return alert("Mật khẩu không khớp");
    await register(formData);
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow-sm"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}
      >
        <div className="card-header text-center bg-light">
          <h2 className="card-title mb-0">Đăng ký tài khoản</h2>
          <p className="card-text text-muted">Tạo tài khoản mới</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <h5 className="mb-3">Thông tin cá nhân</h5>

                {/* Họ và tên + Số điện thoại */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Họ và tên *
                    </label>
                    <input
                      name="name"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Số điện thoại
                    </label>
                    <input
                      name="phone"
                      className="form-control"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Mã số sinh viên + Email */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="studentId" className="form-label">
                      Mã số sinh viên
                    </label>
                    <input
                      name="studentId"
                      className="form-control"
                      id="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
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

                {/* Khoa/Phòng ban + Mật khẩu */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">
                      Xác nhận mật khẩu *
                    </label>
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
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Mật khẩu *
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="department" className="form-label">
                      Khoa/Phòng ban
                    </label>
                    <select
                      name="department"
                      className="form-select"
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option>Chọn khoa/phòng ban</option>
                      <option>Công nghệ thông tin</option>
                      <option>Kế toán</option>
                      <option>Quản trị kinh doanh</option>
                      <option>Ngoại ngữ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              style={{
                background: "linear-gradient(to right, #3b5998, #4c6ef5)",
                border: "none",
              }}
            >
              <i className="bi bi-person-plus-fill me-2"></i>Đăng ký
            </button>
          </form>
          <p className="text-center mt-3 text-muted">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
