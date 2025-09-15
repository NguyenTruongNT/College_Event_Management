import React from "react";

const DepartmentCard = ({ name, percentage }) => {
  return (
    <div className="card mb-3 shadow-sm hover-shadow transition duration-300">
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h6 className="card-title mb-0">{name}</h6>
        </div>
        <div className="progress" style={{ width: "60%" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
