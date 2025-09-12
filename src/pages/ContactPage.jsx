import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Tin nhắn đã được gửi!");
  };

  return (
    <div className="page-section py-5" id="contactSection">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-light">
                <h2 className="card-title mb-0">
                  <i className="bi bi-envelope-fill me-2"></i>Liên hệ với chúng
                  tôi
                </h2>
              </div>
              <div className="card-body">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Họ và tên *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Chủ đề</label>
                    <select
                      className="form-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="support">Hỗ trợ kỹ thuật</option>
                      <option value="partnership">Hợp tác</option>
                      <option value="feedback">Góp ý</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nội dung *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      background: "linear-gradient(to right, #3b5998, #4c6ef5)",
                      border: "none",
                    }}
                  >
                    <i className="bi bi-send-fill me-2"></i>Gửi tin nhắn
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Thông tin liên hệ</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                  <strong>Địa chỉ:</strong>
                  <br />
                  123 Đường ABC, Quận XYZ
                  <br />
                  TP. Hồ Chí Minh, Việt Nam
                </div>
                <div className="mb-3">
                  <i className="bi bi-telephone-fill me-2 text-primary"></i>
                  <strong>Điện thoại:</strong>
                  <br />
                  (+84) 123 456 789
                </div>
                <div className="mb-3">
                  <i className="bi bi-envelope-fill me-2 text-primary"></i>
                  <strong>Email:</strong>
                  <br />
                  contact@eventhub.com
                </div>
                <div className="mb-3">
                  <i className="bi bi-clock-fill me-2 text-primary"></i>
                  <strong>Giờ làm việc:</strong>
                  <br />
                  T2-T6: 8:00 - 17:00
                  <br />
                  T7: 8:00 - 12:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
