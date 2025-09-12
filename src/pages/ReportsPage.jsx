import React from "react";
import ReportCard from "../components/admin/ReportCard";

const reports = [
  {
    id: 1,
    icon: "bi bi-people-fill",
    title: "Báo cáo Người dùng",
    description:
      "Thống kê tăng trưởng người dùng, phân bố vai trò và hoạt động.",
    actions: [{ label: "Xem báo cáo" }, { label: "Xuất Excel" }],
  },
  {
    id: 2,
    icon: "bi bi-calendar-event-fill",
    title: "Báo cáo Sự kiện",
    description: "Thống kê sự tham gia sự kiện, xu hướng và hiệu quả.",
    actions: [{ label: "Xem báo cáo" }, { label: "Xuất Excel" }],
  },
  {
    id: 3,
    icon: "bi bi-star-fill",
    title: "Báo cáo Phản hồi",
    description: "Phân tích xu hướng phản hồi và đánh giá chất lượng sự kiện.",
    actions: [{ label: "Xem báo cáo" }, { label: "Xuất Excel" }],
  },
  {
    id: 4,
    icon: "bi bi-award-fill",
    title: "Báo cáo Chứng chỉ",
    description: "Thống kê việc cấp chứng chỉ và tỷ lệ hoàn thành khóa học.",
    actions: [{ label: "Xem báo cáo" }, { label: "Xuất PDF" }],
  },
];

const ReportsPage = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">
          <i className="bi bi-journal-text me-2"></i> Báo cáo
        </h4>
        <button className="btn btn-success">
          <i className="bi bi-download me-2"></i> Xuất tất cả báo cáo
        </button>
      </div>

      <div className="row">
        {reports.map((report) => (
          <div className="col-md-6" key={report.id}>
            <ReportCard {...report} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
