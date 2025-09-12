function FavoritePhotos() {
  return (
    <div>
      <div
        className="card shadow-sm"
        style={{
          borderRadius: "15px",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        }}
      >
        <div className="card-header">
          <h6>
            <i className="bi bi-heart-fill me-2"></i>Ảnh yêu thích
          </h6>
        </div>
        <div className="card-body">
          <div className="row g-2">
            <div className="col-4">
              <div
                className="media-item"
                style={{
                  height: "60px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="bi bi-image-fill"
                  style={{ fontSize: "20px", color: "#6c757d" }}
                ></i>
              </div>
            </div>
            <div className="col-4">
              <div
                className="media-item"
                style={{
                  height: "60px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="bi bi-image-fill"
                  style={{ fontSize: "20px", color: "#6c757d" }}
                ></i>
              </div>
            </div>
            <div className="col-4">
              <div
                className="media-item"
                style={{
                  height: "60px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className="bi bi-image-fill"
                  style={{ fontSize: "20px", color: "#6c757d" }}
                ></i>
              </div>
            </div>
          </div>
          <button className="btn btn-outline-primary btn-sm w-100 mt-2">
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
}
export default FavoritePhotos;
