import React from "react";
import ReportCard from "../components/admin/ReportCard";

const reports = [
  {
    id: 1,
    icon: "bi bi-people-fill",
    title: "User Reports",
    description:
      "Statistics on user growth, role distribution, and activities.",
    actions: [{ label: "View Report" }, { label: "Export to Excel" }],
  },
  {
    id: 2,
    icon: "bi bi-calendar-event-fill",
    title: "Event Reports",
    description: "Statistics on event participation, trends, and effectiveness.",
    actions: [{ label: "View Report" }, { label: "Export to Excel" }],
  },
  {
    id: 3,
    icon: "bi bi-star-fill",
    title: "Feedback Reports",
    description: "Analysis of feedback trends and event quality evaluations.",
    actions: [{ label: "View Report" }, { label: "Export to Excel" }],
  },
  {
    id: 4,
    icon: "bi bi-award-fill",
    title: "Certificate Reports",
    description: "Statistics on certificate issuance and course completion rates.",
    actions: [{ label: "View Report" }, { label: "Export to PDF" }],
  },
];

const ReportsPage = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">
          <i className="bi bi-journal-text me-2"></i> Reports
        </h4>
        <button className="btn btn-success">
          <i className="bi bi-download me-2"></i> Export All Reports
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