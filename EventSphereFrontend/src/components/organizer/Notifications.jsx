import React, { useState } from "react";

const Notification = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Schedule Change Notice",
      content: `The event "UX/UI Workshop" has been moved from 20/12 to 22/12`,
      recipients: 45,
      date: "1 hour ago",
      status: "Sent",
    },
    {
      id: 2,
      title: "Event Reminder",
      content: `Reminder to join "AI 2025 Conference" tomorrow`,
      recipients: 156,
      date: "1 day ago",
      status: "Sent",
    },
  ]);

  const [stats] = useState({
    sent: 24,
    openRate: 87,
    clickRate: 45,
  });

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <i className="bi bi-bell me-2"></i>Send Notification
        </h4>
        <button className="btn btn-primary d-flex align-items-center">
          <i className="bi bi-send me-2"></i> New Notification
        </button>
      </div>

      <div className="row">
        {/* Notification History */}
        <div className="col-md-8">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-clock-history me-2"></i>Notification History
          </h6>
          {notifications.map((item) => (
            <div
              key={item.id}
              className="card border-0 shadow-sm mb-3 notification-card"
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold">{item.title}</h6>
                    <p className="mb-1">{item.content}</p>
                    <small className="text-muted">
                      Sent to: {item.recipients} participants | {item.date}
                    </small>
                  </div>
                  <span className="badge bg-success">{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notification Stats */}
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">
            <i className="bi bi-graph-up-arrow me-2"></i>Notification Stats
          </h6>
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-2">This Month</h6>
              <p className="mb-1">
                Sent: <span className="fw-bold">{stats.sent} notifications</span>
              </p>
              <p className="mb-1">Open rate: {stats.openRate}%</p>
              <p className="mb-0">Click rate: {stats.clickRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS for hover effect */}
      <style>
        {`
          .notification-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
          }
          .notification-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          }
        `}
      </style>
    </div>
  );
};

export default Notification;
