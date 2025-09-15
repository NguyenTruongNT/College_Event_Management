import React, { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    email: "",
    fullName: "",
    departmentId: "",
    enrollmentNo: ""
  });
  const [editLoading, setEditLoading] = useState(false);

  // Get user role from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserRole(userData.roleId);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Not logged in");

      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else if (response.status === 403) {
        throw new Error("You do not have permission to access this feature");
      } else {
        throw new Error("Unable to fetch user list");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setDeleteLoading(userId);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.filter(user => user.UserId !== userId));
        alert(data.message || "User deleted successfully");
      } else if (response.status === 403) {
        throw new Error("You do not have permission to delete users");
      } else if (response.status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error("Unable to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  const updateUser = async (userId) => {
    try {
      setEditLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not logged in");

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: editForm.email,
          fullName: editForm.fullName,
          departmentId: parseInt(editForm.departmentId),
          enrollmentNo: editForm.enrollmentNo
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(user =>
          user.UserId === userId
            ? { ...user, ...editForm, DepartmentId: parseInt(editForm.departmentId) }
            : user
        ));
        setEditingUser(null);
        alert(data.message || "User updated successfully");
      } else if (response.status === 400) {
        throw new Error("User not found");
      } else if (response.status === 403) {
        throw new Error("You do not have permission to update users");
      } else {
        throw new Error("Unable to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.message);
    } finally {
      setEditLoading(false);
    }
  };

  const confirmDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete user ${user.FullName} (${user.Email})?`)) {
      deleteUser(user.UserId);
    }
  };

  const openEditForm = (user) => {
    setEditingUser(user.UserId);
    setEditForm({
      email: user.Email,
      fullName: user.FullName,
      departmentId: user.DepartmentId || "",
      enrollmentNo: user.EnrollmentNo || ""
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({
      email: "",
      fullName: "",
      departmentId: "",
      enrollmentNo: ""
    });
  };

  useEffect(() => {
    if (userRole === 1) fetchUsers();
  }, [userRole]);

  const getRoleName = (roleId) => {
    const roleMap = {
      1: "Admin",
      2: "Organizer",
      3: "Student"
    };
    return roleMap[roleId] || "Unknown";
  };

  const getRoleBadgeClass = (roleId) => {
    switch (roleId) {
      case 1: return "bg-secondary";
      case 2: return "bg-warning text-dark";
      case 3: return "bg-info text-white";
      default: return "bg-light text-dark";
    }
  };

  const getAvatarColor = (userId) => {
    const colors = [
      "bg-primary", "bg-success", "bg-danger",
      "bg-warning text-dark", "bg-info text-white"
    ];
    return colors[userId % colors.length];
  };

  if (userRole !== 1) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        You do not have permission to access this feature. Only Admin can view the user list.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
        <button
          className="btn btn-sm btn-outline-primary ms-3"
          onClick={fetchUsers}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">User List</h5>
        <button
          className="btn btn-primary btn-sm"
          onClick={fetchUsers}
          disabled={loading}
        >
          <i className="bi bi-arrow-repeat me-1"></i>
          Refresh
        </button>
      </div>
      <div className="table-responsive">
        <table className="table mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Enrollment No</th>
              <th>Role</th>
              <th>Department</th>
              <th style={{ width: 200 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.UserId}>
                {editingUser === user.UserId ? (
                  <tr className="bg-light">
                    <td className="text-muted">{user.UserId}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editForm.enrollmentNo}
                        onChange={(e) => setEditForm({ ...editForm, enrollmentNo: e.target.value })}
                        placeholder="Student ID"
                      />
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${getRoleBadgeClass(user.RoleId)}`}>
                        {getRoleName(user.RoleId)}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={editForm.departmentId}
                        onChange={(e) => setEditForm({ ...editForm, departmentId: e.target.value })}
                      >
                        <option value="">Select Department</option>
                        <option value="1">Communication Technology</option>
                        <option value="2">Chemical and Lips</option>
                        <option value="3">Economy and Management</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => updateUser(user.UserId)}
                        disabled={editLoading}
                        style={{ width: 36, height: 36, padding: 0 }}
                      >
                        {editLoading ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <i className="bi bi-check"></i>
                        )}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={cancelEdit}
                        disabled={editLoading}
                        style={{ width: 36, height: 36, padding: 0 }}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="text-muted">{user.UserId}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className={`${getAvatarColor(user.UserId)}`}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 999,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 16,
                            marginRight: 10,
                          }}
                        >
                          <i className="bi bi-person-fill"></i>
                        </div>
                        <div>{user.FullName}</div>
                      </div>
                    </td>
                    <td>{user.Email}</td>
                    <td>{user.EnrollmentNo || "N/A"}</td>
                    <td>
                      <span className={`badge rounded-pill ${getRoleBadgeClass(user.RoleId)}`}>
                        {getRoleName(user.RoleId)}
                      </span>
                    </td>
                    <td>{user.DepartmentId || "N/A"}</td>
                    <td>
                      <button
                        title="Edit"
                        className="btn btn-outline-primary btn-sm me-1"
                        style={{
                          width: 36,
                          height: 36,
                          padding: 0,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => openEditForm(user)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        title="Delete"
                        className="btn btn-outline-danger btn-sm"
                        style={{
                          width: 36,
                          height: 36,
                          padding: 0,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => confirmDelete(user)}
                        disabled={deleteLoading === user.UserId}
                      >
                        {deleteLoading === user.UserId ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <i className="bi bi-trash-fill"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {users.length === 0 && !loading && (
          <div className="text-center py-4">
            <i className="bi bi-people fs-1 text-muted"></i>
            <p className="text-muted mt-2">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
