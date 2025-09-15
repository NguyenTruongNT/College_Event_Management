import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MediaLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const mediaItems = [
    { id: 1, type: "image" },
    { id: 2, type: "video" },
    { id: 3, type: "image" },
    { id: 4, type: "image" },
    { id: 5, type: "video" },
    { id: 6, type: "image" },
  ];

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleEventChange = (e) => setSelectedEvent(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);

  return (
    <div className="page-section bg-light py-5" id="mediaGallerySection">
      <div className="container-fluid p-4">
        <h2 className="mb-4">
          <i className="bi bi-images me-2"></i>Media Library
        </h2>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for images/videos..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedEvent}
              onChange={handleEventChange}
            >
              <option value="">All events</option>
              <option value="ai-workshop">AI Workshop 2025</option>
              <option value="design-thinking">Design Thinking</option>
              <option value="startup-seminar">Startup Seminar</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">All types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>
          </div>
        </div>

        <div className="media-gallery row g-3">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="media-item col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div
                className="media-placeholder"
                style={{
                  backgroundColor: "#e9ecef",
                  borderRadius: "10px",
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <i
                  className={`bi bi-${item.type === "image" ? "image" : "camera-reels"
                    }-fill`}
                  style={{ fontSize: "40px", color: "#6c757d" }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MediaLibraryPage;