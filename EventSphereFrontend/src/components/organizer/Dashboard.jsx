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
    name: "AI Technology Seminar 2025",
    date: "09/09/2025",
    time: "09:00",
    location: "Hall A",
    status: "Approved",
    registrations: 156,
    max: 200,
  },
  {
    id: 2,
    name: "UX/UI Design Workshop",
    date: "05/09/2025",
    time: "14:00",
    location: "Lab Room 2",
    status: "Pending Approval",
    registrations: 45,
    max: 50,
  },
];

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: "Event Approved",
    content: "AI Technology Seminar 2025 has been approved",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    title: "New Registration",
    content: "5 new registrations for UX/UI Workshop",
    time: "4 hours ago",
    type: "info",
  },
];

const Dashboard = () => {
  const upcoming = mockEvents.length;
  const ongoing = mockEvents.filter((e) => e.status === "Ongoing").length;
  const totalRegistrations = mockEvents.reduce(
    (sum, e) => sum + e.registrations,
    0
  );
  const averageRating = 4.8;
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate("/dashboard/organizer/create-event");
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          <i className="bi-speedometer2 me-2"></i>Overview
        </h3>
        <button onClick={handleCreateEvent} className="btn btn-primary">
          + Create New Event
        </button>
      </div>

      {/* Overview cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaCalendarAlt className="text-primary fs-3 mb-2" />
            <h4 className="fw-bold text-primary">{upcoming}</h4>
            <p className="mb-0">Upcoming Events</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaPlay className="text-success fs-3 mb-2" />
            <h4 className="fw-bold text-success">{ongoing}</h4>
            <p className="mb-0">Ongoing Events</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaUsers className="text-warning fs-3 mb-2" />
            <h4 className="fw-bold text-warning">
              {totalRegistrations.toLocaleString()}
            </h4>
            <p className="mb-0">Total Registrations</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center p-3 h-100">
            <FaStar className="text-info fs-3 mb-2" />
            <h4 className="fw-bold text-info">{averageRating}</h4>
            <p className="mb-0">Avg. Rating</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Events */}
        <div className="col-md-8">
          <h5 className="fw-bold mb-3">Recent Events</h5>
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
                    {event.max} Registrations
                  </p>
                </div>
                <div className="text-end mt-3 mt-md-0">
                  <span
                    className={`badge ${event.status === "Approved"
                      ? "bg-success"
                      : event.status === "Pending Approval"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                      } mb-2 d-block`}
                  >
                    {event.status}
                  </span>
                  <button className="btn btn-outline-primary btn-sm me-2">
                    View Details
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="col-md-4">
          <h5 className="fw-bold mb-3">Recent Notifications</h5>
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
