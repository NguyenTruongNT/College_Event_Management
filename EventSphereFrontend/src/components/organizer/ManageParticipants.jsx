import React, { useState } from "react";

const ManageParticipants = () => {
  const [events] = useState([
    { id: 1, name: "AI Technology Seminar 2025" },
    { id: 2, name: "UX/UI Design Workshop" },
  ]);

  const [participants, setParticipants] = useState({
    1: [
      {
        id: 1,
        name: "Tran Thi B",
        email: "tran.b@email.com",
        phone: "0123456789",
        registered: "10/12/2024",
        status: "Approved",
      },
    ],
    2: [
      {
        id: 2,
        name: "Le Van C",
        email: "le.c@email.com",
        phone: "0987654321",
        registered: "11/12/2024",
        status: "Pending",
      },
    ],
  });

  const [selectedEvent, setSelectedEvent] = useState(events[0].id);
  const [search, setSearch] = useState("");

  const handleApprove = (id) => {
    setParticipants((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent].map((p) =>
        p.id === id ? { ...p, status: "Approved" } : p
      ),
    }));
  };

  const handleReject = (id) => {
    setParticipants((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent].map((p) =>
        p.id === id ? { ...p, status: "Rejected" } : p
      ),
    }));
  };

  const filtered = participants[selectedEvent]?.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className="container py-3">
      <h4 className="fw-bold mb-3">
        <i className="bi-people me-2"></i>Manage Participants
      </h4>
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(Number(e.target.value))}
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search participants..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered?.map((p) => (
        <div
          key={p.id}
          className="card shadow-sm border-start border-primary mb-2"
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">{p.name}</h6>
              <p className="mb-1 text-muted">
                {p.email} | {p.phone}
              </p>
              <p className="mb-0 text-muted">Registered: {p.registered}</p>
            </div>
            <div className="text-end">
              {p.status === "Pending" ? (
                <>
                  <span className="badge bg-warning text-dark me-2">
                    {p.status}
                  </span>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(p.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(p.id)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`badge me-2 ${p.status === "Approved" ? "bg-success" : "bg-danger"
                      }`}
                  >
                    {p.status}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(p.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageParticipants;
