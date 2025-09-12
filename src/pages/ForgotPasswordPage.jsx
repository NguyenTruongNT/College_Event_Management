// src/pages/ForgotPasswordPage.jsx
import { useState } from "react";
import Api from "../services/Api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sau này: Gọi API .NET: Api.post('/api/forgot-password', { email })
    console.log("Request sent for:", email);
    setMessage("Email khôi phục đã gửi! Kiểm tra hộp thư của bạn.");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Khôi phục mật khẩu</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Gửi yêu cầu
              </button>
            </form>
            {message && <p className="mt-3 text-success">{message}</p>}
            <p className="mt-3">
              Quay lại <a href="/login">Đăng nhập</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
