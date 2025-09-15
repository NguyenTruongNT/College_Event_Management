import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FilterBar from "../components/public/FilterBar";

function EventCategoryPage() {
  const [activeTab, setActiveTab] = useState("upcoming-events");
  const navigate = useNavigate();

  const currentDate = new Date("2025-09-11T13:45:00+07:00"); // Current date and time

  const allEvents = [
    {
      id: 1,
      name: "AI Technology Conference",
      date: "15/12/2025",
      time: "08:00 - 17:00",
      location: "Hall A",
      organizer: "Faculty of IT",
      registrations: 120,
      capacity: 150,
    },
    {
      id: 2,
      name: "UX/UI Design Workshop",
      date: "18/12/2025",
      time: "14:00 - 17:00",
      location: "Lab Room 2",
      organizer: "Faculty of Design",
      registrations: 45,
      capacity: 50,
    },
    {
      id: 3,
      name: "Startup Seminar",
      date: "10/09/2025", // Already finished
      time: "09:00 - 12:00",
      location: "Hall B",
      organizer: "Faculty of Business Administration",
      registrations: 200,
      capacity: 250,
    },
    {
      id: 4,
      name: "Digital Economy Conference",
      date: "11/09/2025", // Ongoing (same day)
      time: "13:00 - 17:00",
      location: "Hall C",
      organizer: "Faculty of Economics",
      registrations: 80,
      capacity: 100,
    },
  ];

  // Categorize events based on current date
  const upcomingEvents = allEvents.filter(
    (event) => new Date(event.date) > currentDate
  );
  const ongoingEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === currentDate.toDateString();
  });
  const completedEvents = allEvents.filter(
    (event) => new Date(event.date) < currentDate
  );

  const handleEventDetail = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  const getProgressWidth = (registrations, capacity) => {
    return ((registrations / capacity) * 100).toFixed(0) + "%";
  };

  const getRemainingSpots = (registrations, capacity) => {
    return capacity - registrations;
  };

  const renderEventCard = (event) => (
    <div key={event.id} className="col-md-6 col-lg-4 mb-4">
      <div
        className="card shadow-sm"
        style={{
          borderRadius: "15px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          height: "100%",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
        }}
      >
        <img
          src="https://viet-power.vn/wp-content/uploads/2024/06/banner-su-kien-12.jpg"
          alt={event.name}
          className="card-img-top"
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        />
        <div className="card-body p-3">
          <h5
            className="card-title mb-2"
            style={{ color: "#2c3e50", fontSize: "1.25rem", fontWeight: "600" }}
          >
            {event.name}
          </h5>
          <p className="card-text mb-2">
            <i
              className="bi bi-calendar-date me-2"
              style={{ color: "#007bff" }}
            ></i>
            {event.date}
          </p>
          <p className="card-text mb-2">
            <i className="bi bi-clock me-2" style={{ color: "#28a745" }}></i>
            {event.time}
          </p>
          <p className="card-text mb-2">
            <i className="bi bi-geo-alt me-2" style={{ color: "#17a2b8" }}></i>
            {event.location}
          </p>
          <p className="card-text mb-3">
            <i className="bi bi-people me-2" style={{ color: "#ffc107" }}></i>
            {event.organizer}
          </p>
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center mb-2"
              style={{ fontSize: "0.9rem" }}
            >
              <small style={{ color: "#34495e" }}>
                Registered: {event.registrations}/{event.capacity}
              </small>
              <small className="text-success">
                {getRemainingSpots(event.registrations, event.capacity)} spots
                left
              </small>
            </div>
            <div
              className="progress"
              style={{
                height: "10px",
                backgroundColor: "#e9ecef",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{
                  width: getProgressWidth(event.registrations, event.capacity),
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
          </div>
          <button
            className="btn btn-outline-primary btn-sm w-100"
            onClick={() => handleEventDetail(event.id)}
            style={{
              borderRadius: "25px",
              padding: "8px 0",
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#17a2b8";
              e.target.style.color = "white";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#007bff";
              e.target.style.transform = "scale(1)";
            }}
          >
            <i className="bi bi-info-circle me-2"></i>Details
          </button>
        </div>
      </div>
    </div>
  );

  const getEventsByTab = () => {
    switch (activeTab) {
      case "upcoming-events":
        return upcomingEvents;
      case "ongoing-events":
        return ongoingEvents;
      case "completed-events":
        return completedEvents;
      default:
        return upcomingEvents;
    }
  };

  return (
    <div className="page-section bg-light">
      <div className="container-fluid p-4">
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="mb-3">
              <i className="bi bi-list-ul me-2"></i>EVENT LIST
            </h3>
            <FilterBar></FilterBar>
            {/* <ul className="nav nav-pills mb-3" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "upcoming-events" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("upcoming-events")}
                >
                  <i className="bi bi-clock-fill me-1"></i>Upcoming (
                  {upcomingEvents.length})
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "ongoing-events" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("ongoing-events")}
                >
                  <i className="bi bi-play-circle-fill me-1"></i>Ongoing (
                  {ongoingEvents.length})
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "completed-events" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("completed-events")}
                >
                  <i className="bi bi-check-circle-fill me-1"></i>Completed (
                  {completedEvents.length})
                </button>
              </li>
            </ul> */}
          </div>
        </div>

        <div className="tab-content">
          <div
            className={`tab-pane fade ${activeTab === "upcoming-events" ? "show active" : ""
              }`}
            id="upcoming-events"
          >
            <div className="row" id="upcomingEventsList">
              {getEventsByTab().map(renderEventCard)}
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === "ongoing-events" ? "show active" : ""
              }`}
            id="ongoing-events"
          >
            <div className="row" id="ongoingEventsList">
              {getEventsByTab().map(renderEventCard)}
            </div>
          </div>
          <div
            className={`tab-pane fade ${activeTab === "completed-events" ? "show active" : ""
              }`}
            id="completed-events"
          >
            <div className="row" id="completedEventsList">
              {getEventsByTab().map(renderEventCard)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCategoryPage;
