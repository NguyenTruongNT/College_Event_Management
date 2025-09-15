import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());

  const events = [
    { id: "ai-2025", date: new Date(2025, 8, 12), title: "AI Technology Seminar 2025" },
    { id: "tech-summit", date: new Date(2025, 8, 15), title: "Global Tech Summit" },
    { id: "coding-bootcamp", date: new Date(2025, 8, 20), title: "Basic Programming Bootcamp" },
  ];

  const hasEvent = (date) => events.some(e => e.date.toDateString() === date.toDateString());

  const eventsToday = events.filter(e => e.date.toDateString() === value.toDateString());

  const tileContent = ({ date, view }) => {
    if (view === "month" && hasEvent(date)) {
      return <span className="event-dot"></span>;
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.toDateString() === new Date().toDateString()) {
      return "bg-success text-white";
    }
    return "";
  };

  return (
    <div className="card shadow-sm" style={{ borderRadius: "8px" }}>
      <div className="card-header bg-primary text-white" style={{ borderRadius: "8px 8px 0 0" }}>
        <h5 className="mb-0">Event Calendar</h5>
      </div>
      <div className="card-body p-0">
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="w-100 border-0"
        />
      </div>
      <div className="card-footer">
        <h6 className="mb-2">
          Events Today: {value.toLocaleDateString("en-US")}
        </h6>
        {eventsToday.length > 0 ? (
          eventsToday.map((event) => (
            <div key={event.id} className="card mb-2 shadow-sm">
              <div className="card-body p-2">
                <h6 className="card-title text-primary mb-1">{event.title}</h6>
                <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No events for this day.</p>
        )}
      </div>

      <style>
        {`
          .event-dot {
            display: block;
            width: 6px;
            height: 6px;
            background-color: #0d6efd;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default CalendarComponent;
