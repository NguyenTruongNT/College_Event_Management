function OrganizerDashboard() {
  return (
    <div>
      <h1>Dashboard Tổ chức</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">12 Sự kiện của tôi</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">456 Tổng đăng ký</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">3 Chờ duyệt</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">92% Tỷ lệ tham gia</div>
          </div>
        </div>
      </div>
      <h2>Quản lý sự kiện</h2>
      <button className="btn btn-primary mb-3">Tạo sự kiện mới</button>
      <table className="table">
        <thead>
          <tr>
            <th>Tên sự kiện</th>
            <th>Ngày</th>
            <th>Đăng ký</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hội thảo Công nghệ AI</td>
            <td>09/09/2025</td>
            <td>120/150</td>
            <td>Đã duyệt</td>
            <td>
              <a href="#">Chỉnh sửa</a> | <a href="#">Danh sách</a> |{" "}
              <a href="#">Điểm danh</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrganizerDashboard;
