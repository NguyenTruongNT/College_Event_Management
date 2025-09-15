import React, { useState } from "react";
import EventCard from "../components/admin/EventCard";

const mockEvents = [
  {
    id: 1,
    title: "Technology Conference 2025",
    status: "Pending Approval",
    organizer: "Tran Van C",
    date: "25/02/2024",
    location: "Hall A",
    description:
      "A conference covering the latest technology trends in 2024...",
    actions: ["Approve", "Reject", "Request Changes"],
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    status: "Approved",
    organizer: "Le Thi D",
    date: "20/02/2024",
    location: "Lab Room 1",
    description:
      "Hands-on workshop on AI and Machine Learning for students...",
    actions: ["Approved", "View Details"],
  },
];

const ApproveEventsPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredEvents =
    activeTab === "All"
      ? mockEvents
      : mockEvents.filter((e) => e.status === activeTab);

  const tabs = ["All", "Pending Approval", "Approved", "Rejected"];

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">
        <i className="bi-check-circle me-2"></i>Event Approval
      </h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${tab === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Event Cards */}
      <div className="row">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div className="col-md-6 mb-3" key={event.id}>
              <EventCard {...event} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No events found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApproveEventsPage;
