import React from "react";

const ContentCard = ({ title, status, author, event, content, actions }) => {
  return (
    <div className="card mb-3 shadow-sm hover-shadow transition duration-300">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p
          className={`badge ${
            status === "Chờ duyệt" ? "bg-warning" : "bg-info"
          } mb-2`}
        >
          {status}
        </p>
        <p className="card-text">{author}</p>
        {event && <p className="card-text">{event}</p>}
        <p className="card-text">{content}</p>
        <div className="d-flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`btn btn-sm ${
                action === "Duyệt" ? "btn-success" : "btn-danger"
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

export default ContentCard;
