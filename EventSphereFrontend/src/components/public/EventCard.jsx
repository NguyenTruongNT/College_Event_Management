// src/components/public/EventCard.jsx
import { Link } from "react-router-dom";

const EventCard = ({ title, date, description, imageUrl, eventId }) => {
  return (
    <div
      className="card h-100 d-flex flex-column position-relative"
      style={{ transition: "all 0.3s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <img
        src={imageUrl || "https://aptechsaigon.edu.vn/gw-content/images/1658317030-j0vCdZQ.jpg"}
        className="card-img-top"
        alt={title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary fw-bold mb-2">{title}</h5>
        <p className="text-muted small mb-2">{date}</p>
        <p className="card-text flex-grow-1">{description}</p>
        <Link
          to={`/events/${eventId}`}
          className="btn btn-primary mt-3"
          style={{ transition: "background-color 0.3s ease" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0d6efd")
          }
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
