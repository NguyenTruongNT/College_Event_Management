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
    alert("Your message has been sent!");
  };

  return (
    <div className="page-section py-5" id="contactSection">
      <div className="container-fluid p-4">
        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-light">
                <h2 className="card-title mb-0">
                  <i className="bi bi-envelope-fill me-2"></i>Contact Us
                </h2>
              </div>
              <div className="card-body">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
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
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select Subject</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message *</label>
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
                    <i className="bi bi-send-fill me-2"></i>Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Contact Information</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                  <strong>Address:</strong>
                  <br />
                  123 ABC Street, XYZ District
                  <br />
                  Ho Chi Minh City, Vietnam
                </div>
                <div className="mb-3">
                  <i className="bi bi-telephone-fill me-2 text-primary"></i>
                  <strong>Phone:</strong>
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
                  <strong>Working Hours:</strong>
                  <br />
                  Mon-Fri: 8:00 - 17:00
                  <br />
                  Sat: 8:00 - 12:00
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
