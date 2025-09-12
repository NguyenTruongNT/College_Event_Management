import React, { useState } from "react";

const ManageParticipants = () => {
  const [events] = useState([
    { id: 1, name: "Hội thảo Công nghệ AI 2025" },
    { id: 2, name: "Workshop Thiết kế UX/UI" },
  ]);

  const [participants, setParticipants] = useState({
    1: [
      {
        id: 1,
        name: "Trần Thị B",
        email: "tran.b@email.com",
        phone: "0123456789",
        registered: "10/12/2024",
        status: "Đã phê duyệt",
      },
    ],
    2: [
      {
        id: 2,
        name: "Lê Văn C",
        email: "le.c@email.com",
        phone: "0987654321",
        registered: "11/12/2024",
        status: "Chờ phê duyệt",
      },
    ],
  });

  const [selectedEvent, setSelectedEvent] = useState(events[0].id);
  const [search, setSearch] = useState("");

  const handleApprove = (id) => {
    setParticipants((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent].map((p) =>
        p.id === id ? { ...p, status: "Đã phê duyệt" } : p
      ),
    }));
  };

  const handleReject = (id) => {
    setParticipants((prev) => ({
      ...prev,
      [selectedEvent]: prev[selectedEvent].map((p) =>
        p.id === id ? { ...p, status: "Từ chối" } : p
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
        <i class="bi-people me-2"></i>Quản lý người tham gia
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
          placeholder="Tìm kiếm người tham gia..."
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
              <p className="mb-0 text-muted">Đăng ký: {p.registered}</p>
            </div>
            <div className="text-end">
              {p.status === "Chờ phê duyệt" ? (
                <>
                  <span className="badge bg-warning text-dark me-2">
                    {p.status}
                  </span>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(p.id)}
                  >
                    Phê duyệt
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(p.id)}
                  >
                    Từ chối
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`badge me-2 ${
                      p.status === "Đã phê duyệt" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {p.status}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(p.id)}
                  >
                    Từ chối
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
