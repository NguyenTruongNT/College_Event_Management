import React from "react";

const ActivityCard = ({ icon, title, content, time }) => {
  return (
    <div className="card mb-3 shadow-sm hover-shadow transition duration-300">
      <div className="card-body d-flex align-items-center">
        <i className={`bi ${icon} fs-4 me-3 text-primary`}></i>
        <div>
          <h6 className="card-title mb-1">{title}</h6>
          <p className="card-text mb-1">{content}</p>
          <small className="text-muted">{time}</small>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
