import React from "react";

const NotificationForm = () => {
  return (
    <div
      className="modal fade"
      id="sendNotificationModal"
      tabIndex="-1"
      aria-labelledby="sendNotificationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="sendNotificationModalLabel">
              Send Notification
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Content *</label>
                <textarea className="form-control" rows="4" required></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Recipients *</label>
                <select className="form-select" required>
                  <option value="">Select recipients</option>
                  <option>All Users</option>
                  <option>Students Only</option>
                  <option>Organizers Only</option>
                  <option>Admins Only</option>
                  <option>Specific Users</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Notification Type</label>
                <select className="form-select">
                  <option>Info</option>
                  <option>Warning</option>
                  <option>Urgent</option>
                  <option>Reminder</option>
                </select>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sendEmail"
                />
                <label className="form-check-label" htmlFor="sendEmail">
                  Send via Email
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
