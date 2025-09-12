import React from "react";
import StatCard from "../components/admin/StatCard";
import ActivityCard from "../components/admin/ActivityCard";
import DepartmentCard from "../components/admin/DepartmentCard";
import { Outlet } from "react-router-dom"; //  bạn import Outlet ở đây

function AdminDashboardPage() {
  return (
    <div className="container-fluid p-4">
      {/*  Router sẽ render trang con ở đây */}
      <Outlet />
    </div>
  );
}

export default AdminDashboardPage;
