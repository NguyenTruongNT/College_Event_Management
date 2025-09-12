import React from "react";

const EventCard = ({
  title,
  status,
  organizer,
  date,
  location,
  description,
  actions,
}) => {
  return (
    <div className="card mb-3 shadow-sm hover-shadow transition duration-300">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p
          className={`badge ${
            status === "Đã duyệt" ? "bg-success" : "bg-warning"
          } mb-2`}
        >
          {status}
        </p>
        <p className="card-text">Người tổ chức: {organizer}</p>
        <p className="card-text">Ngày: {date}</p>
        <p className="card-text">Địa điểm: {location}</p>
        <p className="card-text">{description}</p>
        <div className="d-flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                action === "Phê duyệt" || action === "Đã phê duyệt"
                  ? "btn-success"
                  : action === "Từ chối"
                  ? "btn-danger"
                  : "btn-secondary"
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
