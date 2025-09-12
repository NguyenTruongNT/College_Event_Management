import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ManageEvents = () => {
  const [events] = useState([
    {
      id: 1,
      name: "Hội thảo Công nghệ AI 2025",
      date: "09/09/2025",
      time: "09:00",
      location: "Hội trường A",
      registered: 182,
      max: 200,
      status: "Đã phê duyệt",
    },
    {
      id: 2,
      name: "Workshop Thiết kế UX/UI",
      date: "09/09/2025",
      time: "14:00",
      location: "Phòng Lab 2",
      registered: 50,
      max: 50,
      status: "Chờ phê duyệt",
    },
    {
      id: 3,
      name: "Khóa học Marketing Digital",
      date: "09/09/2025",
      time: "10:00",
      location: "Online",
      registered: 100,
      max: 100,
      status: "Đang diễn ra",
    },
    {
      id: 4,
      name: "Hội thảo Blockchain",
      date: "09/09/2025",
      time: "15:00",
      location: "Hội trường B",
      registered: 200,
      max: 200,
      status: "Đã hoàn thành",
    },
  ]);
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    // có thể làm gì đó trước khi chuyển trang
    navigate("/dashboard/organizer/create-event");
  };

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <i class="bi-calendar-check me-2"></i>Quản lý sự kiện
        </h4>
        <button onClick={handleCreateEvent} className="btn btn-primary">
          + Tạo sự kiện mới
        </button>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className="nav-link active">Tất cả</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Chờ phê duyệt</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Đã phê duyệt</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Đang diễn ra</button>
        </li>
        <li className="nav-item">
          <button className="nav-link">Đã hoàn thành</button>
        </li>
      </ul>

      {/* Event list */}
      {events.map((event) => (
        <div key={event.id} className="card shadow-sm border-0 mb-3">
          <div className="card-body d-flex justify-content-between align-items-start">
            <div>
              <h6 className="fw-bold">{event.name}</h6>
              <p className="mb-1 text-muted">
                <i className="bi bi-calendar-event me-1"></i>
                {event.date} - {event.time} &nbsp; | &nbsp;
                <i className="bi bi-geo-alt me-1"></i>
                {event.location}
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-people me-1"></i>
                {event.registered}/{event.max} đăng ký
              </p>
            </div>
            <div className="text-end">
              <span
                className={`badge mb-2 ${
                  event.status === "Đã phê duyệt"
                    ? "bg-success"
                    : event.status === "Chờ phê duyệt"
                    ? "bg-warning text-dark"
                    : event.status === "Đang diễn ra"
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              >
                {event.status}
              </span>
              <div>
                <button className="btn btn-outline-primary btn-sm me-2">
                  Xem chi tiết
                </button>
                <button className="btn btn-outline-secondary btn-sm me-2">
                  Chỉnh sửa
                </button>
                {event.status !== "Đã hoàn thành" && (
                  <button className="btn btn-outline-warning btn-sm">
                    Hủy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageEvents;
