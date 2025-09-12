import React from "react";

const StatCard = ({ icon, value, label, color }) => {
  return (
    <div
      className={`card ${color} text-white mb-3 shadow-sm hover-shadow transition duration-300`}
    >
      <div className="card-body d-flex align-items-center">
        <i className={`bi ${icon} fs-2 me-3`}></i>
        <div>
          <h5 className="card-title mb-0">{value}</h5>
          <p className="card-text">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
