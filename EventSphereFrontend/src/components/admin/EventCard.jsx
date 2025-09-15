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
  // Map Vietnamese status to English
  const statusMap = {
    "Đã duyệt": "Approved",
    "Chờ duyệt": "Pending",
    "Từ chối": "Rejected",
  };

  // Map Vietnamese action buttons to English
  const actionMap = {
    "Phê duyệt": "Approve",
    "Đã phê duyệt": "Approved",
    "Từ chối": "Reject",
  };

  return (
    <div className="card mb-3 shadow-sm hover-shadow transition duration-300">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p
          className={`badge ${status === "Đã duyệt" ? "bg-success" : "bg-warning"
            } mb-2`}
        >
          {statusMap[status] || status}
        </p>
        <p className="card-text">Organizer: {organizer}</p>
        <p className="card-text">Date: {date}</p>
        <p className="card-text">Location: {location}</p>
        <p className="card-text">{description}</p>
        <div className="d-flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`btn btn-sm ${action === "Phê duyệt" || action === "Đã phê duyệt"
                ? "btn-success"
                : action === "Từ chối"
                  ? "btn-danger"
                  : "btn-secondary"
                }`}
            >
              {actionMap[action] || action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
