import React from "react";

const UserTable = ({ users }) => {
  // small inline styles to match visuals
  const avatarStyle = {
    width: 36,
    height: 36,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 16,
  };

  const actionBtnStyle = {
    width: 36,
    height: 36,
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th style={{ width: 150 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="text-muted">{user.id}</td>

                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className={`${user.avatarColor}`}
                      style={{
                        ...avatarStyle,
                        marginRight: 10,
                      }}
                    >
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <div>{user.name}</div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  {user.role === "Học sinh" ? (
                    <span className="badge rounded-pill bg-info text-white">
                      {user.role}
                    </span>
                  ) : user.role === "Người tổ chức" ? (
                    <span className="badge rounded-pill bg-warning text-dark">
                      {user.role}
                    </span>
                  ) : (
                    <span className="badge rounded-pill bg-secondary">
                      {user.role}
                    </span>
                  )}
                </td>

                <td>
                  {user.status === "Hoạt động" ? (
                    <span className="badge rounded-pill bg-success">
                      {user.status}
                    </span>
                  ) : (
                    <span className="badge rounded-pill bg-danger">
                      {user.status}
                    </span>
                  )}
                </td>

                <td>{user.created}</td>

                <td>
                  {/* Edit */}
                  <button
                    title="Sửa"
                    className="btn btn-outline-primary btn-sm me-1"
                    style={actionBtnStyle}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* Pause */}
                  <button
                    title="Tạm ngừng"
                    className="btn btn-outline-warning btn-sm me-1"
                    style={actionBtnStyle}
                  >
                    <i className="bi bi-pause-fill"></i>
                  </button>

                  {/* Delete */}
                  <button
                    title="Xóa"
                    className="btn btn-outline-danger btn-sm"
                    style={actionBtnStyle}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
