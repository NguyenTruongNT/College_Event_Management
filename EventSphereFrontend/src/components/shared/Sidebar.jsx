// src/components/shared/Sidebar.jsx
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  let menuItems = [];

  if (!user) {
    // Guest
    menuItems = [
      { icon: "bi-house", label: "Home", path: "/" },
      { icon: "bi-calendar-event", label: "Events", path: "/events" },
      { icon: "bi-images", label: "Media Library", path: "/media" },
      { icon: "bi-info-circle", label: "About", path: "/about" },
      { icon: "bi-envelope", label: "Contact", path: "/contact" },
      { icon: "bi-question-circle", label: "FAQ", path: "/faq" },
      { icon: "bi-diagram-3", label: "Sitemap", path: "/sitemap" },
    ];
  } else if (user.role === "student") {
    // Student
    menuItems = [
      { icon: "bi-house", label: "Home", path: "/" },
      { icon: "bi-speedometer2", label: "Dashboard", path: "/dashboard/student" },
      { icon: "bi-calendar-check", label: "Registered Events", path: "/dashboard/student/registered-events" },
      { icon: "bi-calendar-event", label: "All Events", path: "/events" },
      { icon: "bi-award", label: "Certificates", path: "/dashboard/student/certificates" },
      { icon: "bi-heart-fill", label: "Favorite Photos", path: "/dashboard/student/favorite-photos" },
      { icon: "bi-bell", label: "Notifications", path: "/dashboard/student/notifications" },
      { icon: "bi-qr-code-scan", label: "QR Check-in", path: "/dashboard/student/qr-checkin" },
      { icon: "bi-star-fill", label: "Rate Events", path: "/dashboard/student/rate-events" },
      { icon: "bi-gear", label: "Settings", path: "/dashboard/student/settings" },
    ];
  } else if (user.role === "organizer") {
    // Organizer
    menuItems = [
      { icon: "bi-house", label: "Home", path: "/" },
      { icon: "bi-speedometer2", label: "Dashboard", path: "/dashboard/organizer" },
      { icon: "bi-plus-circle", label: "Create Event", path: "/dashboard/organizer/create-event" },
      { icon: "bi-calendar-check", label: "Manage Events", path: "/dashboard/organizer/manage-events" },
      { icon: "bi-people", label: "Manage Participants", path: "/dashboard/organizer/manage-participants" },
      { icon: "bi-qr-code-scan", label: "Check-in", path: "/dashboard/organizer/checkin" },
      { icon: "bi-award", label: "Certificates", path: "/dashboard/organizer/certificates" },
      { icon: "bi-images", label: "Media Library", path: "/dashboard/organizer/media" },
      { icon: "bi-bell", label: "Send Notifications", path: "/dashboard/organizer/send-notifications" },
      { icon: "bi-bar-chart", label: "Reports & Analytics", path: "/dashboard/organizer/reports" },
    ];
  } else if (user.role === "admin") {
    // Admin
    menuItems = [
      { icon: "bi-speedometer2", label: "Dashboard", path: "/dashboard/admin" },
      { icon: "bi-people", label: "Manage Users", path: "/dashboard/admin/manage-users" },
      { icon: "bi-check-circle", label: "Approve Events", path: "/dashboard/admin/approve-events" },
      { icon: "bi-shield-check", label: "Moderate Content", path: "/dashboard/admin/moderate-content" },
      { icon: "bi-bell", label: "Send Notifications", path: "/dashboard/admin/send-notifications" },
      { icon: "bi-bar-chart", label: "Reports", path: "/dashboard/admin/reports" },
      { icon: "bi-gear", label: "System Settings", path: "/dashboard/admin/system-settings" },
    ];
  }

  return (
    <div
      className="d-flex flex-column p-3 bg-dark text-white"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <div className="sidebar-header">
        <h3 className="text-center mb-4">
          <i className="bi bi-calendar2-event me-3"></i>Event Sphere
        </h3>
      </div>

      {/* User Info */}
      {user && (
        <div className="d-flex align-items-center p-3 border-bottom mb-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="ms-3">
            <div className="fw-bold">{user?.name || "User"}</div>
            {user.role === "student" && <span className="badge bg-danger">Student</span>}
            {user.role === "organizer" && <span className="badge bg-success">Organizer</span>}
            {user.role === "admin" && <span className="badge bg-dark">Admin</span>}
          </div>
        </div>
      )}

      {/* Menu */}
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li className="nav-item mb-2" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link text-white ${location.pathname === item.path ? "bg-primary" : ""
                }`}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="mt-auto">
        {user ? (
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login" className="btn btn-primary w-100 mb-2">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary w-100">
              <i className="bi bi-person-plus-fill me-2"></i>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
