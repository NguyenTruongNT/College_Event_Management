import React from "react";

const Checkin = () => {
  // Implement QR scan logic if possible, else placeholder
  return (
    <div className="container">
      <h2>Điểm danh sự kiện</h2>
      <button className="btn btn-primary">Bắt đầu quét</button>
      <input
        type="text"
        className="form-control"
        placeholder="Điểm danh thủ công"
      />
      <button className="btn btn-success">Xác nhận tham dự</button>
      <p>Thống kê: 120/160 người đã điểm danh (75%)</p>
    </div>
  );
};

export default Checkin;
