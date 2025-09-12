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
      { icon: "bi-house", label: "Trang chủ", path: "/" },
      { icon: "bi-calendar-event", label: "Sự kiện", path: "/events" },
      { icon: "bi-images", label: "Thư viện Media", path: "/media" },
      { icon: "bi-info-circle", label: "Giới thiệu", path: "/about" },
      { icon: "bi-envelope", label: "Liên hệ", path: "/contact" },
      { icon: "bi-question-circle", label: "FAQ", path: "/faq" },
      { icon: "bi-diagram-3", label: "Sơ đồ trang", path: "/sitemap" },
    ];
  } else if (user.role === "student") {
    // Student
    menuItems = [
      { icon: "bi-house", label: "Trang chủ", path: "/" },
      {
        icon: "bi-speedometer2",
        label: "Dashboard",
        path: "/dashboard/student",
      },
      {
        icon: "bi-calendar-check",
        label: "Sự kiện đã đăng ký",
        path: "/dashboard/student/registered-events",
      },
      { icon: "bi-calendar-event", label: "Tất cả sự kiện", path: "/events" },
      {
        icon: "bi-award",
        label: "Chứng chỉ",
        path: "/dashboard/student/certificates",
      },
      {
        icon: "bi-heart-fill",
        label: "Ảnh yêu thích",
        path: "/dashboard/student/favorite-photos",
      },
      {
        icon: "bi-bell",
        label: "Thông báo",
        path: "/dashboard/student/notifications",
      },
      {
        icon: "bi-qr-code-scan",
        label: "QR Check-in",
        path: "/dashboard/student/qr-checkin",
      },
      {
        icon: "bi-star-fill",
        label: "Đánh giá sự kiện",
        path: "/dashboard/student/rate-events",
      },
      {
        icon: "bi-gear",
        label: "Cài đặt",
        path: "/dashboard/student/settings",
      },
    ];
  } else if (user.role === "organizer") {
    // Organizer
    menuItems = [
      { icon: "bi-house", label: "Trang chủ", path: "/" },
      {
        icon: "bi-speedometer2",
        label: "Dashboard",
        path: "/dashboard/organizer",
      },
      {
        icon: "bi-plus-circle",
        label: "Tạo sự kiện",
        path: "/dashboard/organizer/create-event",
      },
      {
        icon: "bi-calendar-check",
        label: "Quản lý sự kiện",
        path: "/dashboard/organizer/manage-events",
      },
      {
        icon: "bi-people",
        label: "Quản lý tham gia",
        path: "/dashboard/organizer/manage-participants",
      },
      {
        icon: "bi-qr-code-scan",
        label: "Điểm danh",
        path: "/dashboard/organizer/checkin",
      },
      {
        icon: "bi-award",
        label: "Quản lý chứng chỉ",
        path: "/dashboard/organizer/certificates",
      },
      {
        icon: "bi-images",
        label: "Thư viện Media",
        path: "/dashboard/organizer/media",
      },
      {
        icon: "bi-bell",
        label: "Gửi thông báo",
        path: "/dashboard/organizer/send-notifications",
      },
      {
        icon: "bi-bar-chart",
        label: "Báo cáo & Thống kê",
        path: "/dashboard/organizer/reports",
      },
    ];
  } else if (user.role === "admin") {
    // Admin
    menuItems = [
      { icon: "bi-speedometer2", label: "Dashboard", path: "/dashboard/admin" },
      {
        icon: "bi-people",
        label: "Quản lý Người dùng",
        path: "/dashboard/admin/manage-users",
      },
      {
        icon: "bi-check-circle",
        label: "Phê duyệt Sự kiện",
        path: "/dashboard/admin/approve-events",
      },
      {
        icon: "bi-shield-check",
        label: "Kiểm duyệt Nội dung",
        path: "/dashboard/admin/moderate-content",
      },
      {
        icon: "bi-bell",
        label: "Gửi Thông báo",
        path: "/dashboard/admin/send-notifications",
      },
      {
        icon: "bi-bar-chart",
        label: "Báo cáo",
        path: "/dashboard/admin/reports",
      },
      {
        icon: "bi-gear",
        label: "Cài đặt Hệ thống",
        path: "/dashboard/admin/system-settings",
      },
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
            {user?.name?.charAt(0).toUpperCase() || "H"}
          </div>
          <div className="ms-3">
            <div className="fw-bold">{user?.name || "Người dùng"}</div>
            {user.role === "student" && (
              <span className="badge bg-danger">Sinh viên</span>
            )}
            {user.role === "organizer" && (
              <span className="badge bg-success">Người tổ chức</span>
            )}
            {user.role === "admin" && (
              <span className="badge bg-dark">Quản trị viên</span>
            )}
          </div>
        </div>
      )}

      {/* Menu */}
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li className="nav-item mb-2" key={item.path}>
            <Link
              to={item.path}
              className={`nav-link text-white ${
                location.pathname === item.path ? "bg-primary" : ""
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
            Đăng xuất
          </button>
        ) : (
          <div>
            <Link to="/login" className="btn btn-primary w-100 mb-2">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Đăng nhập
            </Link>
            <Link to="/register" className="btn btn-secondary w-100">
              <i className="bi bi-person-plus-fill me-2"></i>
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
