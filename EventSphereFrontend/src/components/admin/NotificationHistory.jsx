import React from "react";

const NotificationHistory = ({ notifications }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-3">Notification History</h3>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="card mb-3 shadow-sm hover-shadow transition duration-300"
          >
            <div className="card-body">
              <h6 className="card-title">{notif.title}</h6>
              <p className="card-text">{notif.content}</p>
              <p className="card-text">
                Recipients: {notif.recipient} • {notif.time}
              </p>
              <span className="badge bg-success">{notif.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationHistory;
