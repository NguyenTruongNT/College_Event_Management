import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const NotificationCard = ({ title, date, message, link }) => {
  return (
    <div
      className="card mb-3 shadow-sm"
      style={{
        borderRadius: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <div className="card-body p-3">
        <div className="d-flex align-items-start mb-2">
          <div
            className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            <i className="bi bi-bell-fill"></i>
          </div>
          <div className="flex-grow-1">
            <h6
              className="card-title mb-1"
              style={{ color: "#2c3e50", fontSize: "1.1rem" }}
            >
              {title}
            </h6>
            <p
              className="text-muted small mb-1"
              style={{ fontSize: "0.85rem" }}
            >
              <i className="bi bi-clock-history me-1"></i>
              {date}
            </p>
            <p
              className="card-text small"
              style={{ color: "#6c757d", lineHeight: "1.4" }}
            >
              {message}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted" style={{ fontSize: "0.8rem" }}>
            <i className="bi bi-chat-dots me-1"></i>
            View Details
          </small>
          <Link
            to={link}
            className="btn btn-outline-primary btn-sm px-3 py-1"
            style={{
              borderRadius: "20px",
              fontSize: "0.85rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#007bff";
              e.target.style.color = "white";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#007bff";
              e.target.style.transform = "scale(1)";
            }}
          >
            <i className="bi bi-arrow-right me-1"></i>Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
