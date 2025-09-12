import React from "react";

const ReportCard = ({ icon, title, description, actions }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center mb-2">
          <i className={`me-2 ${icon}`}></i> {title}
        </h5>
        <p className="card-text">{description}</p>
        <div className="d-flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                action.label.includes("Xem")
                  ? "btn-primary"
                  : action.label.includes("Excel")
                  ? "btn-success"
                  : "btn-success"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
