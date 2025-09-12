import React from "react";
import EventCard from "../components/admin/EventCard";

const mockEvents = [
  {
    id: 1,
    title: "Hội thảo Công nghệ 2025",
    status: "Chờ duyệt",
    organizer: "Trần Văn C",
    date: "25/02/2024",
    location: "Hội trường A",
    description:
      "Hội thảo về các xu hướng công nghệ mới nhất trong năm 2024...",
    actions: ["Phê duyệt", "Từ chối", "Yêu cầu sửa"],
  },
  {
    id: 2,
    title: "Workshop AI & Machine Learning",
    status: "Đã duyệt",
    organizer: "Lê Thị D",
    date: "20/02/2024",
    location: "Phòng Lab 1",
    description:
      "Workshop thực hành về AI và Machine Learning cho sinh viên...",
    actions: ["Đã phê duyệt", "Xem chi tiết"],
  },
];

const ApproveEventsPage = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">
        <i class="bi-check-circle me-2"></i>Phê duyệt Sự kiện
      </h2>
      <ul className="nav nav-tabs mb-3">
        {["Tất cả", "Chờ duyệt", "Đã duyệt", "Từ chối"].map((tab) => (
          <li className="nav-item" key={tab}>
            <a
              className={`nav-link ${tab === "Tất cả" ? "active" : ""}`}
              href="#"
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>
      <div className="row">
        {mockEvents.map((event) => (
          <div className="col-md-6" key={event.id}>
            <EventCard {...event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveEventsPage;
