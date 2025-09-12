import React from "react";
import ContentCard from "../components/admin/ContentCard";

const mockContent = [
  {
    id: 1,
    title: "Phản hồi sự kiện",
    status: "Chờ duyệt",
    author: "Nguyễn Văn E",
    event: "Workshop AI",
    content:
      '"Sự kiện rất bổ ích, tôi đã học được nhiều kiến thức mới về AI..."',
    actions: ["Duyệt", "Từ chối"],
  },
  {
    id: 2,
    title: "Tải ảnh lên",
    status: "Thư viện",
    author: "Trần Thị F",
    content: "event_photo_001.jpg",
    actions: ["Duyệt", "Từ chối"],
  },
];

const ModerateContentPage = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">
        <i class="bi-shield-check me-2"></i>Kiểm duyệt Nội dung
      </h2>
      <ul className="nav nav-tabs mb-3">
        {["Tất cả", "Chờ duyệt", "Phản hồi", "Thư viện ảnh"].map((tab) => (
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
        {mockContent.map((content) => (
          <div className="col-md-6" key={content.id}>
            <ContentCard {...content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModerateContentPage;
