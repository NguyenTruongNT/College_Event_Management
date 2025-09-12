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
              Gửi Thông báo
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
                <label className="form-label">Tiêu đề *</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Nội dung *</label>
                <textarea className="form-control" rows="4" required></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Gửi đến *</label>
                <select className="form-select" required>
                  <option value="">Chọn đối tượng</option>
                  <option>Tất cả người dùng</option>
                  <option>Chỉ học sinh</option>
                  <option>Chỉ người tổ chức</option>
                  <option>Chỉ quản trị viên</option>
                  <option>Người dùng cụ thể</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Loại thông báo</label>
                <select className="form-select">
                  <option>Thông tin</option>
                  <option>Cảnh báo</option>
                  <option>Khẩn cấp</option>
                  <option>Nhắc nhở</option>
                </select>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="sendEmail"
                />
                <label className="form-check-label" htmlFor="sendEmail">
                  Gửi qua email
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
              Hủy
            </button>
            <button type="button" className="btn btn-primary">
              Gửi Thông báo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
