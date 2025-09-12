import React from "react";
import {
  FaCalendarAlt,
  FaPlay,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Mock data for events
const mockEvents = [
  {
    id: 1,
    name: "Hội thảo Công nghệ AI 2025",
    date: "09/09/2025",
    time: "09:00",
    location: "Hội trường A",
    status: "Đã phê duyệt",
    registrations: 156,
    max: 200,
  },
  {
    id: 2,
    name: "Workshop Thiết kế UX/UI",
    date: "05/09/2025",
    time: "14:00",
    location: "Phòng Lab 2",
    status: "Chờ phê duyệt",
    registrations: 45,
    max: 50,
  },
];

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: "Sự kiện được phê duyệt",
    content: "Hội thảo AI 2025 đã được phê duyệt",
    time: "2 giờ trước",
    type: "success",
  },
  {
    id: 2,
    title: "Đăng ký mới",
    content: "5 người mới đăng ký Workshop UX/UI",
    time: "4 giờ trước",
    type: "info",
  },
];

const Dashboard = () => {
  const upcoming = mockEvents.length;
  const ongoing = mockEvents.filter((e) => e.status === "Đang diễn ra").length;
  const totalRegistrations = mockEvents.reduce(
    (sum, e) => sum + e.registrations,
    0
  );
  const averageRating = 4.8;
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    // có thể làm gì đó trước khi chuyển trang
    navigate("/dashboard/organizer/create-event");
  };
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <i class="bi-speedometer2 me-2"></i>Tổng quan
        </h3>
        <button onClick={handleCreateEvent} className="btn btn-primary">
          + Tạo sự kiện mới
        </button>
      </div>

      {/* Overview cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaCalendarAlt className="text-primary fs-3 mb-2" />
            <h4 className="fw-bold text-primary">{upcoming}</h4>
            <p className="mb-0">Sự kiện sắp tới</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaPlay className="text-success fs-3 mb-2" />
            <h4 className="fw-bold text-success">{ongoing}</h4>
            <p className="mb-0">Đang diễn ra</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaUsers className="text-warning fs-3 mb-2" />
            <h4 className="fw-bold text-warning">
              {totalRegistrations.toLocaleString()}
            </h4>
            <p className="mb-0">Tổng đăng ký</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaStar className="text-info fs-3 mb-2" />
            <h4 className="fw-bold text-info">{averageRating}</h4>
            <p className="mb-0">Đánh giá TB</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Events */}
        <div className="col-md-8">
          <h5 className="fw-bold mb-3">Sự kiện gần đây</h5>
          {mockEvents.map((event) => (
            <div className="card shadow-sm border-0 mb-3" key={event.id}>
              <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <div>
                  <h6 className="fw-bold mb-1">{event.name}</h6>
                  <p className="mb-1 text-muted">
                    <FaCalendarAlt className="me-2" />
                    {event.date} - {event.time} &nbsp; | &nbsp;
                    <i className="bi bi-geo-alt"></i> {event.location}
                  </p>
                  <p className="mb-0">
                    <FaUsers className="me-2" /> {event.registrations}/
                    {event.max} đăng ký
                  </p>
                </div>
                <div className="text-end mt-3 mt-md-0">
                  <span
                    className={`badge ${
                      event.status === "Đã phê duyệt"
                        ? "bg-success"
                        : event.status === "Chờ phê duyệt"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    } mb-2 d-block`}
                  >
                    {event.status}
                  </span>
                  <button className="btn btn-outline-primary btn-sm me-2">
                    Xem chi tiết
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="col-md-4">
          <h5 className="fw-bold mb-3">Thông báo mới</h5>
          {mockNotifications.map((notif) => (
            <div className="card shadow-sm border-0 mb-3" key={notif.id}>
              <div className="card-body p-3">
                <h6 className="fw-bold mb-1">
                  {notif.title}
                  {notif.type === "success" && (
                    <FaCheckCircle className="text-success ms-2" />
                  )}
                  {notif.type === "info" && (
                    <FaUserPlus className="text-primary ms-2" />
                  )}
                </h6>
                <p className="mb-1">{notif.content}</p>
                <small className="text-muted">{notif.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
