import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function SitemapPage() {
  return (
    <div className="page-section bg-light py-5" id="sitemapSection">
      <div className="container-fluid p-4">
        <h2 className="mb-4">
          <i className="bi bi-diagram-3-fill me-2"></i>Sơ đồ trang web
        </h2>

        <div className="row">
          <div className="col-md-3">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">
                  <i className="bi bi-house-fill me-2"></i>Trang chính
                </h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">
                  <i className="bi bi-calendar-event-fill me-2"></i>Sự kiện
                </h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Danh sách sự kiện
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Chi tiết sự kiện
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Tìm kiếm & Lọc
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">
                  <i className="bi bi-images-fill me-2"></i>Media
                </h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Thư viện ảnh
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Thư viện video
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h6 className="card-title mb-0">
                  <i className="bi bi-person-fill me-2"></i>Tài khoản
                </h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Đăng nhập
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Đăng ký
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark"
                      onMouseEnter={(e) => (e.target.style.color = "#3b5998")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitemapPage;
