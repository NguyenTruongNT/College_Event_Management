import React from "react";

function FavoritePhotos() {
  const mediaItems = Array(6).fill(null); // Số lượng ảnh yêu thích hiển thị (ví dụ 6)

  return (
    <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
      <div className="card-header">
        <h6>
          <i className="bi bi-heart-fill me-2"></i>
          Favorite Photos
        </h6>
      </div>
      <div className="card-body">
        <div className="row g-2">
          {mediaItems.map((_, idx) => (
            <div className="col-4" key={idx}>
              <div
                className="media-item"
                style={{
                  height: "60px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <i
                  className="bi bi-image-fill"
                  style={{ fontSize: "20px", color: "#6c757d" }}
                ></i>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-outline-primary btn-sm w-100 mt-2">
          View All
        </button>
      </div>
    </div>
  );
}

export default FavoritePhotos;
