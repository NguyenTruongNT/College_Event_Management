import React from "react";
import UserTable from "../components/admin/UserTable";
import AddUserModal from "../components/admin/AddUserModal";

const mockUsers = [
  {
    id: "#001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    role: "Student",
    status: "Active",
    created: "15/01/2024",
    avatarColor: "bg-primary",
  },
  {
    id: "#002",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    role: "Organizer",
    status: "Active",
    created: "12/01/2024",
    avatarColor: "bg-success",
  },
];

const ManageUsersPage = () => {
  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0 fw-bold">
          <i className="bi-people me-2"></i>User Management
        </h3>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
        >
          <i className="bi bi-plus-lg me-1"></i> Add User
        </button>
      </div>

      {/* Search & filters card */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2 align-items-center">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search users..."
              />
            </div>
            <div className="col-auto">
              <select className="form-select">
                <option>All Roles</option>
                <option>Student</option>
                <option>Organizer</option>
                <option>Administrator</option>
              </select>
            </div>
            <div className="col-auto">
              <select className="form-select">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Suspended</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="col-auto ms-auto">
              <button className="btn btn-outline-primary">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <UserTable users={mockUsers} />

      {/* Modal */}
      <AddUserModal />
    </div>
  );
};

export default ManageUsersPage;