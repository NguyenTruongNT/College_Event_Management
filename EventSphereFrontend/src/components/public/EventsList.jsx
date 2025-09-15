import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const EventsList = () => {
  const upcomingEvents = [
    {
      date: "15",
      month: "Dec",
      title: "AI Seminar",
      timeLocation: "08:00 - Hall A",
      participants: "120/150 participants",
    },
    {
      date: "18",
      month: "Dec",
      title: "UX/UI Workshop",
      timeLocation: "14:00 - Lab 2",
      participants: "45/50 participants",
    },
    {
      date: "22",
      month: "Dec",
      title: "Startup Seminar",
      timeLocation: "09:00 - Hall B",
      participants: "200/250 participants",
    },
  ];

  const topOrganizers = [
    {
      avatar: "K",
      name: "IT Department",
      events: "23 events",
      rating: "4.9",
    },
    {
      avatar: "Q",
      name: "Business Administration Dept.",
      events: "18 events",
      rating: "4.7",
    },
    {
      avatar: "T",
      name: "Design Department",
      events: "15 events",
      rating: "4.8",
    },
  ];

  const newsItems = [
    {
      date: "12/12",
      title: "New Feature Update",
      description: "QR Code check-in system has been upgraded",
    },
    {
      date: "10/12",
      title: "Maintenance Notice",
      description: "System maintenance scheduled at 2 AM on 15/12",
    },
    {
      date: "08/12",
      title: "New Policy",
      description: "Updated regulations for event certificates",
    },
  ];

  return (
    <div className="col-lg-4">
      {/* Upcoming Events */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title">
            <i className="bi bi-clock me-2"></i>Upcoming Events
          </h6>
          <div className="upcoming-events-list">
            {upcomingEvents.map((event, index) => (
              <div className="d-flex mb-3" key={index}>
                <div className="event-date-badge me-3 text-center bg-primary text-white p-2 rounded">
                  {event.date}
                  <br />
                  <small>{event.month}</small>
                </div>
                <div className="event-info">
                  <div className="fw-bold">{event.title}</div>
                  <small className="text-muted">{event.timeLocation}</small>
                  <div className="event-participants">
                    <i className="bi bi-people me-1"></i>
                    {event.participants}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-outline-primary w-100 mt-3">
            <i className="bi bi-calendar me-2"></i>View All
          </button>
        </div>
      </div>

      {/* Top Organizers */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title">
            <i className="bi bi-trophy me-2"></i>Top Organizers
          </h6>
          <div className="top-organizers">
            {topOrganizers.map((organizer, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <div
                  className="organizer-avatar bg-primary text-white rounded-circle text-center me-3"
                  style={{ width: "40px", height: "40px", lineHeight: "40px" }}
                >
                  {organizer.avatar}
                </div>
                <div className="organizer-info flex-grow-1">
                  <div className="fw-bold">{organizer.name}</div>
                  <small className="text-muted">{organizer.events}</small>
                </div>
                <div className="organizer-rating">
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  <span>{organizer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* News & Announcements */}
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">
            <i className="bi bi-newspaper me-2"></i>News & Announcements
          </h6>
          <div className="news-list">
            {newsItems.map((news, index) => (
              <div className="d-flex mb-3" key={index}>
                <div className="news-date me-3 text-center bg-light p-2 rounded">
                  {news.date}
                </div>
                <div className="news-content">
                  <div className="fw-bold">{news.title}</div>
                  <small className="text-muted">{news.description}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-filter-bar mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search events..."
                id="searchInput"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;
