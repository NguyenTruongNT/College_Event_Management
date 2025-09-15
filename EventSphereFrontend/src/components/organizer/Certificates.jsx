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
    event: "AI Technology Seminar 2025",
    template: "Default Template",
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
    const newCert = {
      id: certificates.length + 1,
      event: form.event,
      sent: Math.floor(Math.random() * 100) + 20,
      created: new Date().toLocaleDateString("en-GB"),
    };
    setCertificates([newCert, ...certificates]);
    alert("Certificate created successfully!");
  };

  return (
    <div className="container py-3">
      <h4 className="fw-bold mb-3">
        <i className="bi-award me-2"></i>Certificate Management
      </h4>
      <div className="row">
        {/* Create Certificate Form */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Create Certificate</h6>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Select Event</label>
                  <select
                    className="form-select"
                    name="event"
                    value={form.event}
                    onChange={handleChange}
                  >
                    <option>AI Technology Seminar 2025</option>
                    <option>UX/UI Design Workshop</option>
                    <option>Digital Marketing Course</option>
                    <option>Blockchain Seminar</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Certificate Template</label>
                  <select
                    className="form-select"
                    name="template"
                    value={form.template}
                    onChange={handleChange}
                  >
                    <option>Default Template</option>
                    <option>Modern Template</option>
                    <option>Minimal Template</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Certificate File</label>
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Certificate
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Created Certificates List */}
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">Created Certificates</h6>
          {certificates.map((cert) => (
            <div key={cert.id} className="card shadow-sm border-0 mb-2">
              <div className="card-body">
                <h6 className="fw-bold mb-1">{cert.event}</h6>
                <p className="mb-1 text-muted">{cert.sent} certificates sent</p>
                <p className="mb-0 text-muted">Created: {cert.created}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
