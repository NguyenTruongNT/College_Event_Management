import React from "react";
import { Outlet } from "react-router-dom";

const OrganizerDashboardPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar organizer có thể nằm ở đây nếu muốn */}
        <div className="col">
          {/* Outlet sẽ render nội dung route con */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;
