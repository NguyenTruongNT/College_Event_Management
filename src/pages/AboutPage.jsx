import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AboutPage() {
  return (
    <div className="page-section bg-light py-5" id="aboutSection">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h2 className="card-title mb-0">
                  <i className="bi bi-info-circle-fill me-2"></i>Giới thiệu
                  EventHub
                </h2>
              </div>
              <div className="card-body">
                <p className="lead">
                  EventHub là nền tảng quản lý sự kiện hàng đầu dành cho các tổ
                  chức giáo dục và sinh viên.
                </p>

                <h4>Tầm nhìn</h4>
                <p>
                  Trở thành nền tảng kết nối hàng đầu giữa các tổ chức và người
                  tham gia sự kiện, tạo ra những trải nghiệm học tập và phát
                  triển tốt nhất.
                </p>

                <h4>Sứ mệnh</h4>
                <p>
                  Cung cấp công cụ quản lý sự kiện hiệu quả, giúp các tổ chức dễ
                  dàng tổ chức và quản lý sự kiện, đồng thời mang đến trải
                  nghiệm tham gia tuyệt vời cho người dùng.
                </p>

                <h4>Tính năng nổi bật</h4>
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Quản lý sự kiện toàn diện
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Đăng ký và check-in tự động
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Hệ thống chứng chỉ điện tử
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Thư viện media phong phú
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Báo cáo và thống kê chi tiết
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    Tích hợp lịch và chia sẻ mạng xã hội
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
              <div className="card-header bg-white">
                <h5 className="card-title mb-0">Thống kê hệ thống</h5>
              </div>
              <div className="card-body text-center">
                <div
                  className="stat-card mb-3"
                  style={{
                    background: "linear-gradient(to right, #4c6ef5, #6f42c1)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="stat-number">2,847</div>
                  <div>Người dùng</div>
                </div>
                <div
                  className="stat-card mb-3"
                  style={{
                    background: "linear-gradient(to right, #28a745, #218838)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="stat-number">156</div>
                  <div>Sự kiện</div>
                </div>
                <div
                  className="stat-card"
                  style={{
                    background: "linear-gradient(to right, #fd7e14, #f76707)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="stat-number">89%</div>
                  <div>Tỷ lệ hài lòng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
