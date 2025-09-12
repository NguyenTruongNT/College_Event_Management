function EventRegisted() {
  return (
    <div>
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
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5>
              <i className="bi bi-calendar-check-fill me-2"></i>Sự kiện đã đăng
              ký
            </h5>
            <div className="position-relative">
              <i
                className="bi bi-bell-fill text-primary"
                style={{ fontSize: "1.2rem" }}
              ></i>
              <span className="notification-badge bg-danger text-white">3</span>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Tên sự kiện</th>
                    <th>Ngày</th>
                    <th>Trạng thái</th>
                    <th>Check-in</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hội thảo Công nghệ AI</td>
                    <td>15/02/2025</td>
                    <td>
                      <span className="badge bg-success">Đã xác nhận</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        QR Code
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-info me-2">
                        Chi tiết
                      </button>
                      <button className="btn btn-sm btn-outline-warning">
                        Đánh giá
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Workshop Thiết kế UX/UI</td>
                    <td>09/09/2025</td>
                    <td>
                      <span className="badge bg-warning">Chờ xác nhận</span>
                    </td>
                    <td>-</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger">
                        Hủy đăng ký
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Seminar Khởi nghiệp</td>
                    <td>09/09/2025</td>
                    <td>
                      <span className="badge bg-secondary">Đã hoàn thành</span>
                    </td>
                    <td>
                      <span className="text-success">✓ Đã check-in</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success">
                        Tải chứng chỉ
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventRegisted;
