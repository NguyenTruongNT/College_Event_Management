function OrganizerDashboard() {
  return (
    <div>
      <h1>Organizer Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">12 My Events</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">456 Total Registrations</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">3 Pending Approval</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">92% Attendance Rate</div>
          </div>
        </div>
      </div>
      <h2>Event Management</h2>
      <button className="btn btn-primary mb-3">Create New Event</button>
      <table className="table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Registrations</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AI Technology Seminar</td>
            <td>09/09/2025</td>
            <td>120/150</td>
            <td>Approved</td>
            <td>
              <a href="#">Edit</a> | <a href="#">List</a> | <a href="#">Check-in</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrganizerDashboard;
