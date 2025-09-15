import React from "react";

const Checkin = () => {
  // Placeholder for QR scan logic
  return (
    <div className="container">
      <h2>Event Check-in</h2>
      <button className="btn btn-primary">Start Scan</button>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Manual Check-in"
      />
      <button className="btn btn-success">Confirm Attendance</button>
      <p>Stats: 120/160 participants checked in (75%)</p>
    </div>
  );
};

export default Checkin;
