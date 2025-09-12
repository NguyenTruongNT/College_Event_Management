function UserDashboard() {
  return (
    <div>
      <h1>Dashboard Sinh viên</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">8 Sự kiện đã đăng ký</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">5 Đã tham gia</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">3 Chứng chỉ</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">12 Ảnh yêu thích</div>
          </div>
        </div>
      </div>
      <h2>Sự kiện đã đăng ký</h2>
      <table className="table">
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
            <td>09/09/2025</td>
            <td>Đã xác nhận</td>
            <td>QR Code</td>
            <td>
              <a href="#">Chi tiết</a> | <a href="#">Đánh giá</a>
            </td>
          </tr>
          {/* Hardcode từ HTML */}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
