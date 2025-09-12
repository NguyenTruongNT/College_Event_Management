import React from "react";

const AddUserModal = () => {
  return (
    <div
      className="modal fade"
      id="addUserModal"
      tabIndex="-1"
      aria-labelledby="addUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addUserModalLabel">
              Thêm Người dùng Mới
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
                <label className="form-label">Họ tên *</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input type="email" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Vai trò *</label>
                <select className="form-select" required>
                  <option value="">Chọn vai trò</option>
                  <option>Học sinh</option>
                  <option>Người tổ chức</option>
                  <option>Quản trị viên</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Phòng ban</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="form-label">Mật khẩu tạm thời *</label>
                <input type="password" className="form-control" required />
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
              Thêm Người dùng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
