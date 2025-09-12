import React, { useState } from "react";

const Notification = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Thông báo thay đổi lịch",
      content: `Sự kiện "Workshop UX/UI" đã được dời từ 20/12 sang 22/12`,
      recipients: 45,
      date: "1 giờ trước",
      status: "Đã gửi",
    },
    {
      id: 2,
      title: "Nhắc nhở sự kiện",
      content: `Nhắc nhở tham gia "Hội thảo AI 2025" vào ngày mai`,
      recipients: 156,
      date: "1 ngày trước",
      status: "Đã gửi",
    },
  ]);

  const [stats] = useState({
    sent: 24,
    openRate: 87,
    clickRate: 45,
  });

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <i class="bi-bell me-2"></i>Gửi thông báo
        </h4>
        <button className="btn btn-primary d-flex align-items-center">
          <i className="bi bi-send me-2"></i> Gửi thông báo mới
        </button>
      </div>

      <div className="row">
        {/* Lịch sử thông báo */}
        <div className="col-md-8">
          <h6 className="fw-bold mb-3">
            <i class="bi bi-clock-history me-2"></i>Lịch sử thông báo
          </h6>
          {notifications.map((item) => (
            <div
              key={item.id}
              className="card border-0 shadow-sm mb-3 notification-card"
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold">{item.title}</h6>
                    <p className="mb-1">{item.content}</p>
                    <small className="text-muted">
                      Gửi đến: {item.recipients} người tham gia | {item.date}
                    </small>
                  </div>
                  <span className="badge bg-success">{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thống kê thông báo */}
        <div className="col-md-4">
          <h6 className="fw-bold mb-3">
            <i class="bi bi-graph-up-arrow me-2"></i>Thống kê thông báo
          </h6>
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold mb-2">Tháng này</h6>
              <p className="mb-1">
                Đã gửi: <span className="fw-bold">{stats.sent} thông báo</span>
              </p>
              <p className="mb-1">Tỷ lệ mở: {stats.openRate}%</p>
              <p className="mb-0">Tỷ lệ click: {stats.clickRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS inline cho hover */}
      <style>
        {`
          .notification-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
          }
          .notification-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          }
        `}
      </style>
    </div>
  );
};

export default Notification;
