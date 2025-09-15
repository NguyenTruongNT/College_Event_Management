import React from "react";
import NotificationForm from "../components/admin/NotificationForm";
import NotificationHistory from "../components/admin/NotificationHistory";

const mockNotifications = [
  {
    id: 1,
    title: "New Policy Update",
    content: "Notification about updating system usage policies...",
    recipient: "All users",
    time: "2 hours ago",
    status: "Sent",
  },
  {
    id: 2,
    title: "Event Registration Reminder",
    content: "Deadline for AI Workshop registration ends tomorrow...",
    recipient: "Students",
    time: "1 day ago",
    status: "Sent",
  },
];

const SendNotificationsPage = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">
          <i className="bi bi-bell-fill me-2"></i> Send Notifications
        </h4>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#sendNotificationModal"
        >
          <i className="bi bi-plus me-1"></i> Create Notification
        </button>
      </div>

      <NotificationHistory notifications={mockNotifications} />
      <NotificationForm />
    </div>
  );
};

export default SendNotificationsPage;