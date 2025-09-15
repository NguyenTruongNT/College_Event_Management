// src/pages/EventDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function EventDetailPage() {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Get event ID from URL, e.g. /event-detail/1

  // Sample event data based on ID
  const eventData = {
    1: {
      name: "AI Technology Conference",
      date: "12/15/2025",
      time: "08:00 - 17:00",
      location: "Hall A, Vietnam National University, HCMC",
      organizer: "Faculty of Information Technology",
      category: "Technology",
      speaker: "Dr. Nguyen Van A",
      certificate: "Yes",
      description:
        "The conference will introduce the latest trends in Artificial Intelligence (AI), machine learning, and real-world applications across industries. Leading experts will share practical experiences and in-depth knowledge, providing opportunities for learning and networking.",
      program: [
        "08:00 - 08:30: Registration and materials",
        "08:30 - 10:00: Session 1 - Overview of AI and Machine Learning",
        "10:15 - 11:45: Session 2 - AI Applications in Business",
        "13:30 - 15:00: Session 3 - AI Hands-on Workshop",
        "15:15 - 16:45: Session 4 - Q&A and Discussion",
        "16:45 - 17:00: Certificate Ceremony and Closing",
      ],
      registrations: 120,
      capacity: 150,
      image: "https://via.placeholder.com/800x400?text=AI+Conference",
    },
    2: {
      name: "UX/UI Design Workshop",
      date: "12/18/2025",
      time: "14:00 - 17:00",
      location: "Lab 2, University of Fine Arts, HCMC",
      organizer: "Faculty of Graphic Design",
      category: "Design",
      speaker: "Dr. Tran Thi B",
      certificate: "Yes",
      description:
        "A hands-on UX/UI design workshop with modern tools like Figma and Adobe XD, covering beginner to advanced levels. Suitable for beginners and professional designers.",
      program: [
        "14:00 - 15:00: Introduction to UX/UI and Design Process",
        "15:00 - 16:30: Practical Design with Figma",
        "16:30 - 17:00: Feedback and Discussion",
      ],
      registrations: 45,
      capacity: 50,
      image: "https://via.placeholder.com/800x400?text=UX/UI+Workshop",
    },
    3: {
      name: "Startup Seminar",
      date: "09/10/2025",
      time: "09:00 - 12:00",
      location: "Hall B, University of Economics HCMC",
      organizer: "Faculty of Business Administration",
      category: "Startup",
      speaker: "Dr. Le Van C",
      certificate: "Yes",
      description:
        "The seminar provides effective startup strategies, from ideas to execution, guided by successful entrepreneurs. The banner information helps guests understand the event's theme and purpose.",
      program: [
        "09:00 - 10:00: Introduction to Entrepreneurship",
        "10:00 - 11:30: Strategy & Business Model Discussion",
        "11:30 - 12:00: Q&A and Networking",
      ],
      registrations: 200,
      capacity: 250,
      image: "https://via.placeholder.com/800x400?text=Startup+Seminar",
    },
    4: {
      name: "Digital Economy Conference",
      date: "09/11/2025",
      time: "13:00 - 17:00",
      location: "Hall C, National Economics University",
      organizer: "Faculty of Economics",
      category: "Economics",
      speaker: "Dr. Pham Thi D",
      certificate: "Yes",
      description:
        "A conference on the digital economy and digital transformation for businesses, focusing on new trends and cutting-edge technologies.",
      program: [
        "13:00 - 14:00: Digital Economy Overview",
        "14:00 - 15:30: Digital Transformation Practices",
        "15:30 - 17:00: Discussion and Exchange",
      ],
      registrations: 80,
      capacity: 100,
      image: "https://via.placeholder.com/800x400?text=Digital+Economy+Conference",
    },
  };

  const event = eventData[eventId] || eventData[1]; // Fallback to first event if ID is invalid
  const currentDate = new Date("2025-09-11T14:39:00+07:00");
  const eventDate = new Date(event.date);
  const status =
    eventDate > currentDate
      ? "Upcoming"
      : eventDate.toDateString() === currentDate.toDateString()
        ? "Ongoing"
        : "Ended";

  const goBack = () => {
    navigate("/events");
  };

  const getProgressWidth = (registrations, capacity) => {
    return ((registrations / capacity) * 100).toFixed(0) + "%";
  };

  const getRemainingSpots = (registrations, capacity) => {
    return capacity - registrations;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleRegister = () => {
    if (!isLoggedIn) {
      alert("Please log in to register!");
    } else {
      alert("Registration successful! Please check your email for confirmation.");
    }
  };

  const handleShare = (platform) => {
    alert(`Event shared successfully on ${platform}!`);
  };

  const handleAddToCalendar = (service) => {
    alert(`Event added to ${service}. Please check your calendar.`);
  };

  return (
    <div className="page-section bg-light py-5" id="eventDetailSection">
      <div className="container-fluid p-4">
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={goBack}
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>

        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <img
                src={event.image}
                alt={event.name}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body p-4">
                <h2 className="card-title mb-3">{event.name}</h2>
                <div className="mb-4 d-flex gap-3">
                  <span className="badge bg-primary">{event.date}</span>
                  <span
                    className="badge"
                    style={{
                      background:
                        status === "Upcoming"
                          ? "#28a745"
                          : status === "Ongoing"
                            ? "#17a2b8"
                            : "#dc3545",
                      color: "white",
                    }}
                  >
                    {status}
                  </span>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <p>
                      <i className="bi bi-clock-fill me-2"></i>
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p>
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p>
                      <i className="bi bi-people-fill me-2"></i>
                      <strong>Organizer:</strong> {event.organizer}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <i className="bi bi-tag-fill me-2"></i>
                      <strong>Category:</strong> {event.category}
                    </p>
                    <p>
                      <i className="bi bi-person-fill me-2"></i>
                      <strong>Speaker:</strong> {event.speaker}
                    </p>
                    <p>
                      <i className="bi bi-award-fill me-2"></i>
                      <strong>Certificate:</strong> {event.certificate}
                    </p>
                  </div>
                </div>

                <h5>Event Description</h5>
                <p>{event.description}</p>

                <h5>Program</h5>
                <ul className="list-group list-group-flush mb-4">
                  {event.program.map((item, index) => (
                    <li key={index} className="list-group-item">
                      {item}
                    </li>
                  ))}
                </ul>

                <h6>Add to Calendar</h6>
                <div className="d-flex gap-3 mb-4">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleAddToCalendar("Google Calendar")}
                  >
                    <i className="bi bi-google me-2"></i>Google Calendar
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleAddToCalendar("Outlook")}
                  >
                    <i className="bi bi-microsoft me-2"></i>Outlook
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleAddToCalendar("ICS")}
                  >
                    <i className="bi bi-download me-2"></i>Download ICS
                  </button>
                </div>

                <h6>Share Event</h6>
                <div className="d-flex gap-3">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#3b5998", color: "white" }}
                    onClick={() => handleShare("Facebook")}
                  >
                    <i className="bi bi-facebook"></i>
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#1da1f2", color: "white" }}
                    onClick={() => handleShare("Twitter")}
                  >
                    <i className="bi bi-twitter"></i>
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#0077b5", color: "white" }}
                    onClick={() => handleShare("LinkedIn")}
                  >
                    <i className="bi bi-linkedin"></i>
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#25d366", color: "white" }}
                    onClick={() => handleShare("WhatsApp")}
                  >
                    <i className="bi bi-whatsapp"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5>
                  <i className="bi bi-ticket-perforated me-2"></i>Register Now
                </h5>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Registered:{" "}
                      <strong>
                        {event.registrations}/{event.capacity}
                      </strong>
                    </span>
                    <span className="text-success">
                      {getRemainingSpots(event.registrations, event.capacity)}{" "}
                      spots left
                    </span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: getProgressWidth(
                          event.registrations,
                          event.capacity
                        ),
                      }}
                    ></div>
                  </div>
                  <small className="text-muted d-block text-center mt-2">
                    {getRemainingSpots(event.registrations, event.capacity)}{" "}
                    spots remaining
                  </small>
                </div>
                <button
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleRegister}
                >
                  <i className="bi bi-person-plus-fill me-2"></i>Register Now
                </button>
                <div className="text-center">
                  <small className="text-muted">
                    Free • Certificate: {event.certificate}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
