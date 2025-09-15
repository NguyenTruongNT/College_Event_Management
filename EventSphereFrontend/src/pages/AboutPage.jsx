import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AboutPage() {
  return (
    <div className="page-section bg-light py-5" id="aboutSection">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h2 className="card-title mb-0">
                  <i className="bi bi-info-circle-fill me-2"></i>About EventHub
                </h2>
              </div>
              <div className="card-body">
                <p className="lead">
                  EventHub is a leading event management platform designed for educational organizations and students.
                </p>

                <h4>Vision</h4>
                <p>
                  To become the leading platform connecting organizations and event participants, providing the best learning and development experiences.
                </p>

                <h4>Mission</h4>
                <p>
                  To provide efficient event management tools, enabling organizations to easily organize and manage events while delivering excellent experiences for participants.
                </p>

                <h4>Key Features</h4>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Comprehensive event management
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Automatic registration and check-in
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Electronic certificate system
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Rich media library
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Detailed reports and analytics
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Calendar integration and social sharing
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">System Statistics</h5>
              </div>
              <div className="card-body text-center">
                <div
                  className="stat-card mb-3"
                  style={{
                    background: "linear-gradient(to right, #4c6ef5, #6f42c1)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="stat-number">2,847</div>
                  <div>Users</div>
                </div>
                <div
                  className="stat-card mb-3"
                  style={{
                    background: "linear-gradient(to right, #28a745, #218838)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="stat-number">156</div>
                  <div>Events</div>
                </div>
                <div
                  className="stat-card"
                  style={{
                    background: "linear-gradient(to right, #fd7e14, #f76707)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="stat-number">89%</div>
                  <div>Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
