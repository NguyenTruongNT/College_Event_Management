// src/components/public/HomeHero.jsx
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <div className="bg-primary text-white text-center py-5 position-relative w-100">
      {/* Overlay to highlight text */}
      <div className="bg-dark bg-opacity-50 w-100 h-100 position-absolute top-0 start-0"></div>

      <div className="position-relative z-1">
        <h1 className="display-4 fw-bold mb-3">
          Welcome to Event Sphere
        </h1>
        <p className="lead mb-4">
          The leading event management platform for students and organizations
        </p>
        <div className="alert alert-warning text-dark mb-4">
          Featured Event:{" "}
          <Link to="/events/ai-2024" className="text-dark fw-bold">
            AI Technology Seminar 2025 - Register Now!
          </Link>
        </div>
        <Link to="/events" className="btn btn-light btn-lg mt-4">
          Explore Events
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
