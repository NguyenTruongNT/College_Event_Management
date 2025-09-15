// src/pages/ForgotPasswordPage.jsx
import { useState } from "react";
import Api from "../services/Api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Later: Call .NET API: Api.post('/api/forgot-password', { email })
    console.log("Request sent for:", email);
    setMessage("Recovery email has been sent! Please check your inbox.");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Password Recovery</div>
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
                Send Request
              </button>
            </form>
            {message && <p className="mt-3 text-success">{message}</p>}
            <p className="mt-3">
              Back to <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
