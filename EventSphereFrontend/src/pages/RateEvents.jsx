import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

// Initialize FontAwesome
library.add(faStar);

const RateEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("review");
  const [ratings, setRatings] = useState({
    overall: 0,
    organization: 0,
    content: 0,
    venue: 0,
    coordination: 0,
    technical: 0,
    service: 0,
  });
  const [formData, setFormData] = useState({
    userType: "",
    eventName: "",
    comments: "",
  });
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      userType: "Professional",
      event: "Tech Conference 2024",
      rating: 5,
      comment: "Great event with diverse and engaging content.",
      venue: 5,
      organization: 5,
      technical: 4,
      service: 5,
      date: "2 days ago",
    },
    {
      name: "Jane Smith",
      userType: "Student",
      event: "AI & Machine Learning Workshop",
      rating: 4,
      comment: "Very useful workshop for students, highly recommended.",
      venue: 4,
      organization: 4,
      technical: 4,
      service: 4,
      date: "5 days ago",
    },
    {
      name: "Michael Lee",
      userType: "Industry Representative",
      event: "Startup Summit Vietnam",
      rating: 3,
      comment: "Interesting startups, but the organization could improve.",
      venue: 4,
      organization: 3,
      technical: 3,
      service: 3,
      date: "1 week ago",
    },
  ]);
  const [filters, setFilters] = useState({
    event: "",
    rating: "",
    userType: "",
  });

  const handleStarClick = (ratingType, value) => {
    setRatings((prev) => ({ ...prev, [ratingType]: value }));
  };

  const handleStarHover = (ratingType, value, stars) => {
    Array.from(stars).forEach((star, index) => {
      star.style.color = index < value ? "#ffc107" : "#ddd";
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userType || !formData.eventName) {
      alert("Please fill in all required fields!");
      return;
    }
    alert("Thank you for your feedback! Your input will help improve the event quality.");
    setFormData({ userType: "", eventName: "", comments: "" });
    setRatings({
      overall: 0,
      organization: 0,
      content: 0,
      venue: 0,
      coordination: 0,
      technical: 0,
      service: 0,
    });
    document.querySelectorAll(".star").forEach((star) => (star.style.color = "#ddd"));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterReviews = () => {
    let filtered = [...reviews];
    if (filters.event) filtered = filtered.filter((r) => r.event === filters.event);
    if (filters.rating) filtered = filtered.filter((r) => r.rating === parseInt(filters.rating));
    if (filters.userType)
      filtered = filtered.filter((r) =>
        r.userType.toLowerCase().includes(filters.userType.toLowerCase())
      );
    return filtered;
  };

  const handleLoadMore = () => {
    const newReview = {
      name: "Emily Davis",
      userType: "Lecturer",
      event: "Digital Transformation in Business",
      rating: 5,
      comment: "Very practical and insightful content.",
      venue: 5,
      organization: 5,
      technical: 5,
      service: 4,
      date: "2 weeks ago",
    };
    setReviews((prev) => [...prev, newReview]);
  };

  const reviewRef = useRef(null);

  useEffect(() => {
    const cards = reviewRef.current?.querySelectorAll(".review-card");
    cards?.forEach((card) => {
      card.addEventListener("mouseenter", () => (card.style.transform = "translateY(-2px)"));
      card.addEventListener("mouseleave", () => (card.style.transform = "translateY(0)"));
    });
    return () =>
      cards?.forEach((card) => {
        card.removeEventListener("mouseenter", () => { });
        card.removeEventListener("mouseleave", () => { });
      });
  }, [reviews]);

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="main-container"
        style={{
          width: "100%",
          background: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="header-section"
          style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>
            <i className="fas fa-star me-2"></i>Event Feedback
          </h1>
          <p className="mb-0">
            Share your experience and feedback to help improve our events
          </p>
        </div>

        {/* Tabs */}
        <div className="p-4">
          <ul className="nav nav-tabs" id="mainTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                onClick={() => setActiveTab("review")}
                type="button"
              >
                <i className="fas fa-edit me-2"></i>Submit Feedback
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "view" ? "active" : ""}`}
                onClick={() => setActiveTab("view")}
                type="button"
              >
                <i className="fas fa-eye me-2"></i>View Feedback
              </button>
            </li>
          </ul>

          {/* Form Section */}
          {activeTab === "review" && (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label className="form-label">User Type</label>
                <select
                  className="form-select"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select user type</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Industry Representative">Industry Representative</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                  required
                />
              </div>

              {/* Ratings */}
              {[
                { label: "Overall Experience", key: "overall" },
                { label: "Organization Quality", key: "organization" },
                { label: "Content Relevance", key: "content" },
                { label: "Venue", key: "venue" },
                { label: "Coordination", key: "coordination" },
                { label: "Technical", key: "technical" },
                { label: "Hospitality Service", key: "service" },
              ].map((item) => (
                <div className="mb-3" key={item.key}>
                  <label className="form-label">{item.label}</label>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="star me-2"
                        onClick={() => handleStarClick(item.key, i + 1)}
                        onMouseOver={(e) =>
                          handleStarHover(
                            item.key,
                            i + 1,
                            e.currentTarget.parentElement.querySelectorAll(".star")
                          )
                        }
                        style={{
                          fontSize: "1.5rem",
                          color: i < ratings[item.key] ? "#ffc107" : "#ddd",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label">Comments & Suggestions</label>
                <textarea
                  className="form-control"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Write your feedback here..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit Feedback
              </button>
            </form>
          )}

          {/* View Section */}
          {activeTab === "view" && (
            <div className="mt-4">
              <h4>Overall Ratings</h4>
              <p>⭐ 4.5/5 (based on {reviews.length} reviews)</p>

              {/* Filters */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <select
                    name="event"
                    value={filters.event}
                    onChange={handleFilterChange}
                    className="form-select"
                  >
                    <option value="">All Events</option>
                    {reviews.map((r, idx) => (
                      <option key={idx} value={r.event}>
                        {r.event}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="form-select"
                  >
                    <option value="">All Ratings</option>
                    {[5, 4, 3, 2, 1].map((val) => (
                      <option key={val} value={val}>
                        {val} Stars
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    name="userType"
                    value={filters.userType}
                    onChange={handleFilterChange}
                    className="form-control"
                    placeholder="Filter by user type"
                  />
                </div>
              </div>

              {/* Reviews */}
              <div ref={reviewRef}>
                {filterReviews().map((review, idx) => (
                  <div
                    key={idx}
                    className="review-card mb-3 p-3 border rounded shadow-sm"
                  >
                    <h5>{review.name}</h5>
                    <p className="mb-1">
                      <strong>Event:</strong> {review.event}
                    </p>
                    <p className="mb-1">
                      <strong>User Type:</strong> {review.userType}
                    </p>
                    <p className="mb-1">
                      <strong>Rating:</strong> {"⭐".repeat(review.rating)}
                    </p>
                    <p className="mb-1">
                      <strong>Comment:</strong> {review.comment}
                    </p>
                    <small className="text-muted">{review.date}</small>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-outline-primary w-100 mt-3"
                onClick={handleLoadMore}
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateEvents;
