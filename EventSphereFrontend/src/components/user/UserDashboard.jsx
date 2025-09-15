import React from "react";

function UserDashboard() {
  return (
    <div className="container-fluid p-4">
      <h1>Student Dashboard</h1>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">8 Registered Events</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">5 Attended</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">3 Certificates</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">12 Favorite Photos</h5>
            </div>
          </div>
        </div>
      </div>

      <h2>Registered Events</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Check-in</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AI Technology Seminar</td>
            <td>09/09/2025</td>
            <td>Confirmed</td>
            <td>QR Code</td>
            <td>
              <a href="#">Details</a> | <a href="#">Review</a>
            </td>
          </tr>
          {/* You can dynamically map events from API here */}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
