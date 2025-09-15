import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CertificateCard from "../components/public/CertificateCard";
import EventRegisted from "../components/public/EventRegisted";
import FavoritePhotos from "../components/public/FavoritePhotos";

function StudentDashboardPage() {
  return (
    <div className="page-section bg-light py-5" id="studentDashboard">
      <div className="container-fluid p-4">
        <h2 className="mb-4">
          <i className="bi bi-person-vcard-fill me-2"></i>Student Dashboard
        </h2>

        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div
              className="card shadow-sm text-center p-3"
              style={{
                borderRadius: "15px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div className="stat-number">8</div>
              <div>Registered Events</div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card shadow-sm text-center p-3"
              style={{
                borderRadius: "15px",
                background: "linear-gradient(to right, #28a745, #218838)",
                color: "white",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div className="stat-number">5</div>
              <div>Attended</div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card shadow-sm text-center p-3"
              style={{
                borderRadius: "15px",
                background: "linear-gradient(to right, #fd7e14, #f76707)",
                color: "white",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div className="stat-number">3</div>
              <div>Certificates</div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card shadow-sm text-center p-3"
              style={{
                borderRadius: "15px",
                background: "linear-gradient(to right, #dc3545, #c82333)",
                color: "white",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div className="stat-number">12</div>
              <div>Favorite Photos</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          <div className="col-lg-8">
            <EventRegisted></EventRegisted>
          </div>
          <div className="col-lg-4">
            <CertificateCard></CertificateCard>
            <FavoritePhotos></FavoritePhotos>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;