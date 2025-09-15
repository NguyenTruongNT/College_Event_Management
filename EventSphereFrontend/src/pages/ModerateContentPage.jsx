import React from "react";
import ContentCard from "../components/admin/ContentCard";

const mockContent = [
  {
    id: 1,
    title: "Event Feedback",
    status: "Pending Approval",
    author: "Nguyen Van E",
    event: "AI Workshop",
    content:
      '"The event was very helpful, I learned a lot of new knowledge about AI..."',
    actions: ["Approve", "Reject"],
  },
  {
    id: 2,
    title: "Image Upload",
    status: "Library",
    author: "Tran Thi F",
    content: "event_photo_001.jpg",
    actions: ["Approve", "Reject"],
  },
];

const ModerateContentPage = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">
        <i className="bi-shield-check me-2"></i>Content Moderation
      </h2>
      <ul className="nav nav-tabs mb-3">
        {["All", "Pending Approval", "Feedback", "Image Library"].map((tab) => (
          <li className="nav-item" key={tab}>
            <a
              className={`nav-link ${tab === "All" ? "active" : ""}`}
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