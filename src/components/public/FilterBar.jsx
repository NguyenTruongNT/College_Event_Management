import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function FilterBar() {
  return (
    <div className="bg-light py-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4 mb-2 mb-md-0">
            <div
              className="input-group"
              style={{
                borderRadius: "25px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")
              }
            >
              <span
                className="input-group-text bg-white border-0"
                style={{
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                }}
              >
                <i className="bi bi-search" style={{ color: "#6c757d" }}></i>
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Tìm kiếm sự kiện..."
                style={{
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  boxShadow: "none",
                  outline: "none",
                }}
              />
            </div>
          </div>
          <div className="col-md-2 mb-2 mb-md-0">
            <select
              className="form-select"
              style={{
                borderRadius: "25px",
                padding: "8px 15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")
              }
            >
              <option>Tất cả danh mục</option>
              <option>Công nghệ</option>
              <option>Thiết kế</option>
              <option>Khởi nghiệp</option>
              <option>Kinh tế</option>
            </select>
          </div>
          <div className="col-md-2 mb-2 mb-md-0">
            <select
              className="form-select"
              style={{
                borderRadius: "25px",
                padding: "8px 15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")
              }
            >
              <option>Tất cả phòng ban</option>
              <option>CNTT</option>
              <option>Thiết kế</option>
              <option>Quản trị Kinh doanh</option>
              <option>Kinh tế</option>
            </select>
          </div>
          <div className="col-md-2 mb-2 mb-md-0">
            <select
              className="form-select"
              style={{
                borderRadius: "25px",
                padding: "8px 15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")
              }
            >
              <option>Tất cả thời gian</option>
              <option>Hôm nay</option>
              <option>Ngày mai</option>
              <option>Tuần này</option>
              <option>Tháng này</option>
              <option>Sắp tới</option>
              <option>Đang diễn ra</option>
              <option>Đã kết thúc</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              style={{
                borderRadius: "25px",
                padding: "10px 0",
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#0056b3";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="bi bi-funnel me-2"></i>Lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
