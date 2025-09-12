// src/components/public/Calendar.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());
  const events = [
    {
      id: "ai-2025",
      date: new Date(2025, 8, 12),
      title: "Hội thảo Công nghệ AI 2025",
    },
    {
      id: "tech-summit",
      date: new Date(2025, 8, 15),
      title: "Hội nghị Công nghệ Toàn cầu",
    },
    {
      id: "coding-bootcamp",
      date: new Date(2025, 8, 20),
      title: "Khóa học Lập trình Cơ bản",
    },
  ];

  // Tùy chỉnh tileContent để hiển thị dấu chấm cho ngày có sự kiện
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventCount = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      ).length;
      return eventCount > 0 ? (
        <span
          style={{
            display: "block",
            width: "6px",
            height: "6px",
            backgroundColor: "#0d6efd",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        ></span>
      ) : null;
    }
    return null;
  };

  // Tùy chỉnh tileClassName để đánh dấu ngày hiện tại
  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.toDateString() === new Date().toDateString()) {
      return "bg-success text-white";
    }
    return "";
  };

  return (
    <div
      className="card"
      style={{
        border: "none",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <div
        className="card-header bg-primary text-white"
        style={{ borderRadius: "8px 8px 0 0" }}
      >
        <h5 className="mb-0">Lịch sự kiện</h5>
      </div>
      <div className="card-body p-0">
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="w-100 border-0"
          style={{ border: "none" }}
        />
      </div>

      <div className="card-footer">
        <h6 className="mb-2">
          Sự kiện trong ngày: {value.toLocaleDateString("vi-VN")}
        </h6>
        {events
          .filter((event) => event.date.toDateString() === value.toDateString())
          .map((event) => (
            <div
              key={event.id}
              className="card mb-2"
              style={{
                border: "none",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body p-2">
                <h6 className="card-title text-primary mb-1">{event.title}</h6>
                <Link
                  to={`/events/${event.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
