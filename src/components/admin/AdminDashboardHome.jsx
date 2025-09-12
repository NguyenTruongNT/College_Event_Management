import React from "react";
import StatCard from "./StatCard";
import ActivityCard from "./ActivityCard";
import DepartmentCard from "./DepartmentCard";

const mockStats = [
  {
    icon: "bi-person",
    value: 1247,
    label: "Tổng Người dùng",
    color: "bg-primary",
  },
  {
    icon: "bi-check-circle",
    value: 89,
    label: "Sự kiện Đã duyệt",
    color: "bg-success",
  },
  {
    icon: "bi-hourglass-split",
    value: 23,
    label: "Chờ Phê duyệt",
    color: "bg-warning",
  },
  {
    icon: "bi-exclamation-triangle",
    value: 5,
    label: "Cảnh báo Hệ thống",
    color: "bg-danger",
  },
];

const mockActivities = [
  {
    id: 1,
    icon: "bi-person-plus",
    title: "Người dùng mới",
    content: "Nguyễn Văn A đăng ký",
    time: "5 phút trước",
  },
  {
    id: 2,
    icon: "bi-calendar-event",
    title: "Sự kiện chờ duyệt",
    content: "Hội thảo Công nghệ 2025",
    time: "15 phút trước",
  },
  {
    id: 3,
    icon: "bi-chat-left-text",
    title: "Phản hồi mới",
    content: "Đánh giá Workshop AI",
    time: "30 phút trước",
  },
];

const mockDepartments = [
  { name: "Công nghệ Thông tin", percentage: 95 },
  { name: "Kinh tế", percentage: 88 },
  { name: "Y học", percentage: 82 },
];

function AdminDashboardHome() {
  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">
        <i class="bi bi-speedometer2 me-2"></i>Admin Dashboard
      </h2>
      <div className="row mb-4">
        {mockStats.map((stat, i) => (
          <div className="col-md-3" key={i}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-6">
          <h3 className="mb-3">Hoạt động Gần đây</h3>
          {mockActivities.map((a) => (
            <ActivityCard key={a.id} {...a} />
          ))}
        </div>
        <div className="col-md-6">
          <h3 className="mb-3">Phòng ban Xuất sắc</h3>
          {mockDepartments.map((d, i) => (
            <DepartmentCard key={i} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHome;
