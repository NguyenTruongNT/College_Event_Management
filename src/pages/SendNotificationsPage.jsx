import React from "react";
import NotificationForm from "../components/admin/NotificationForm";
import NotificationHistory from "../components/admin/NotificationHistory";

const mockNotifications = [
  {
    id: 1,
    title: "Cập nhật chính sách mới",
    content: "Thông báo về việc cập nhật chính sách sử dụng hệ thống...",
    recipient: "Tất cả người dùng",
    time: "2 giờ trước",
    status: "Đã gửi",
  },
  {
    id: 2,
    title: "Nhắc nhở đăng ký sự kiện",
    content: "Hạn chót đăng ký Workshop AI sẽ kết thúc vào ngày mai...",
    recipient: "Học sinh",
    time: "1 ngày trước",
    status: "Đã gửi",
  },
];

const SendNotificationsPage = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">
          <i className="bi bi-bell-fill me-2"></i> Gửi Thông báo
        </h4>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#sendNotificationModal"
        >
          <i className="bi bi-plus me-1"></i> Tạo Thông báo
        </button>
      </div>

      <NotificationHistory notifications={mockNotifications} />
      <NotificationForm />
    </div>
  );
};

export default SendNotificationsPage;
