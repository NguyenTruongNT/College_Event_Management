import React, { useState } from "react";

const Certificates = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      event: "AI Workshop 2024",
      sent: 120,
      created: "08/09/2025",
    },
    {
      id: 2,
      event: "UX Design Course",
      sent: 45,
      created: "09/09/2025",
    },
  ]);

  const [form, setForm] = useState({
    event: "Hội thảo Công nghệ AI 2025",
    template: "Mẫu chuẩn",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả sử mỗi lần tạo sẽ thêm vào danh sách chứng chỉ đã tạo
    const newCert = {
      id: certificates.length + 1,
      event: form.event,
      sent: Math.floor(Math.random() * 100) + 20, // fake số lượng
      created: new Date().toLocaleDateString("vi-VN"),
    };
    setCertificates([newCert, ...certificates]);
    alert("Tạo chứng chỉ thành công!");
  };

  return (
    <div className="container py-3">
      <h4 className="fw-bold mb-3">
        <i class="bi-award me-2"></i>Quản lý chứng chỉ
      </h4>
      <div className="row">
        {/* Form tạo chứng chỉ */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Tạo chứng chỉ</h6>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Chọn sự kiện</label>
                  <select
                    className="form-select"
                    name="event"
                    value={form.event}
                    onChange={handleChange}
                  >
                    <option>Hội thảo Công nghệ AI 2025</option>
                    <option>Workshop Thiết kế UX/UI</option>
                    <option>Khóa học Marketing Digital</option>
                    <option>Hội thảo Blockchain</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mẫu chứng chỉ</label>
                  <select
                    className="form-select"
                    name="template"
                    value={form.template}
                    onChange={handleChange}
                  >
                    <option>Mẫu chuẩn</option>
                    <option>Mẫu hiện đại</option>
                    <option>Mẫu tối giản</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tải lên file chứng chỉ</label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Tạo chứng chỉ
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Danh sách chứng chỉ đã tạo */}
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">Chứng chỉ đã tạo</h6>
          {certificates.map((cert) => (
            <div key={cert.id} className="card shadow-sm border-0 mb-2">
              <div className="card-body">
                <h6 className="fw-bold mb-1">{cert.event}</h6>
                <p className="mb-1 text-muted">{cert.sent} chứng chỉ đã gửi</p>
                <p className="mb-0 text-muted">Tạo: {cert.created}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
