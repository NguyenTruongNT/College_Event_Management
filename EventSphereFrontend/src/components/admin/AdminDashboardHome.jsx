import React from "react";
import StatCard from "./StatCard";
import ActivityCard from "./ActivityCard";
import DepartmentCard from "./DepartmentCard";

const mockStats = [
  {
    icon: "bi-person",
    value: 1247,
    label: "Total Users",
    color: "bg-primary",
  },
  {
    icon: "bi-check-circle",
    value: 89,
    label: "Approved Events",
    color: "bg-success",
  },
  {
    icon: "bi-hourglass-split",
    value: 23,
    label: "Pending Approval",
    color: "bg-warning",
  },
  {
    icon: "bi-exclamation-triangle",
    value: 5,
    label: "System Alerts",
    color: "bg-danger",
  },
];

const mockActivities = [
  {
    id: 1,
    icon: "bi-person-plus",
    title: "New User",
    content: "Nguyen Van A registered",
    time: "5 minutes ago",
  },
  {
    id: 2,
    icon: "bi-calendar-event",
    title: "Pending Event",
    content: "Tech Seminar 2025",
    time: "15 minutes ago",
  },
  {
    id: 3,
    icon: "bi-chat-left-text",
    title: "New Feedback",
    content: "AI Workshop Review",
    time: "30 minutes ago",
  },
];

const mockDepartments = [
  { name: "Information Technology", percentage: 95 },
  { name: "Economics", percentage: 88 },
  { name: "Medicine", percentage: 82 },
];

function AdminDashboardHome() {
  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">
        <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
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
          <h3 className="mb-3">Recent Activities</h3>
          {mockActivities.map((a) => (
            <ActivityCard key={a.id} {...a} />
          ))}
        </div>
        <div className="col-md-6">
          <h3 className="mb-3">Top Departments</h3>
          {mockDepartments.map((d, i) => (
            <DepartmentCard key={i} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHome;
