import React, { useState, useEffect, useCallback } from "react";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("approved");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    maxParticipants: 1,
    categoryId: "",
    venueId: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState({});
  const [selectedEventId, setSelectedEventId] = useState(null);

  const statusMap = {
    0: { label: "Pending Approval", badge: "bg-warning text-dark", icon: "bi-clock-history" },
    1: { label: "Approved", badge: "bg-success", icon: "bi-check-circle" },
    2: { label: "Ongoing", badge: "bg-primary", icon: "bi-play-circle" },
    3: { label: "Completed", badge: "bg-secondary", icon: "bi-check2-circle" },
  };

  const fetchApprovedEvents = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/events");
      if (!res.ok) throw new Error("Failed to load approved events");
      const data = await res.json();

      const formatted = data.events.map((e) => ({
        ...e,
        id: e.EventId,
        name: e.Title,
        date: new Date(e.StartTime).toLocaleDateString("en-US"),
        time: new Date(e.StartTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        location: e.VenueName,
        category: e.CategoryName,
        statusInfo: statusMap[e.Status] || { label: "Unknown", badge: "bg-dark", icon: "bi-question-circle" }
      }));

      setEvents(formatted);
    } catch (error) {
      console.error("Error fetching approved events:", error);
      setError("Cannot load approved events list");
    }
  }, []);

  const fetchPendingEvents = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/events/pending");
      if (!res.ok) {
        if (res.status === 403) {
          setPendingEvents([]);
          return;
        }
        throw new Error("Failed to load pending events");
      }
      const data = await res.json();

      const formatted = data.pendingEvents.map((e) => ({
        ...e,
        id: e.EventId,
        name: e.Title,
        date: new Date(e.StartTime).toLocaleDateString("en-US"),
        time: new Date(e.StartTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        location: e.VenueName,
        category: e.CategoryName,
        statusInfo: statusMap[e.Status] || { label: "Unknown", badge: "bg-dark", icon: "bi-question-circle" }
      }));

      setPendingEvents(formatted);
    } catch (error) {
      console.error("Error fetching pending events:", error);
      setError("Cannot load pending events list");
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/categories");
      if (!res.ok) throw new Error("Cannot fetch categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchVenues = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/venues");
      if (!res.ok) throw new Error("Cannot fetch venues");
      const data = await res.json();
      setVenues(data.venues || []);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchApprovedEvents(), fetchPendingEvents(), fetchCategories(), fetchVenues()]);
    } finally {
      setLoading(false);
    }
  }, [fetchApprovedEvents, fetchPendingEvents, fetchCategories, fetchVenues]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleViewEventDetails = (eventId) => {
    setSelectedEventId(eventId);
    alert(`View details for event ID: ${eventId}\n\nIn a real app, this would navigate to the event details page.`);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setActionLoading(prev => ({ ...prev, create: true }));

    try {
      if (!newEvent.title.trim() || !newEvent.description.trim()) {
        setError("Please enter both title and description");
        return;
      }

      if (newEvent.maxParticipants <= 0) {
        setError("Max participants must be greater than 0");
        return;
      }

      if (new Date(newEvent.startTime) >= new Date(newEvent.endTime)) {
        setError("End time must be after start time");
        return;
      }

      if (new Date(newEvent.startTime) <= new Date()) {
        setError("Start time must be in the future");
        return;
      }

      const eventData = {
        ...newEvent,
        categoryId: parseInt(newEvent.categoryId),
        venueId: parseInt(newEvent.venueId)
      };

      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess("Event created successfully and pending approval!");
        setShowCreateModal(false);
        resetNewEvent();
        loadData();
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.error || getErrorMessage(res.status));
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setError("An error occurred while creating the event. Please try again.");
    } finally {
      setActionLoading(prev => ({ ...prev, create: false }));
    }
  };

  const handleApproveEvent = async (eventId) => {
    setActionLoading(prev => ({ ...prev, [`approve-${eventId}`]: true }));
    try {
      const res = await fetch(`http://localhost:5000/events/${eventId}/approve`, { method: "PUT" });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Event approved successfully!");
        loadData();
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.error || getErrorMessage(res.status));
      }
    } catch (error) {
      console.error("Error approving event:", error);
      setError("An error occurred while approving the event");
    } finally {
      setActionLoading(prev => ({ ...prev, [`approve-${eventId}`]: false }));
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    setActionLoading(prev => ({ ...prev, [`delete-${eventId}`]: true }));

    try {
      const res = await fetch(`http://localhost:5000/events/${eventId}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Event deleted successfully!");
        loadData();
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.error || getErrorMessage(res.status));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("An error occurred while deleting the event");
    } finally {
      setActionLoading(prev => ({ ...prev, [`delete-${eventId}`]: false }));
    }
  };

  const getErrorMessage = (status) => {
    switch (status) {
      case 400: return "Invalid information";
      case 403: return "You do not have permission to perform this action";
      case 404: return "Event not found";
      case 500: return "Server error, please try again later";
      default: return "An error occurred, please try again";
    }
  };

  const resetNewEvent = () => setNewEvent({
    title: "", description: "", startTime: "", endTime: "", maxParticipants: 1, categoryId: "", venueId: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: name === "maxParticipants" ? parseInt(value) || 1 : value }));
    if (error) setError("");
  };

  const clearAlerts = () => { setError(""); setSuccess(""); };
  const getCurrentEvents = () => (activeTab === "approved" ? events : pendingEvents);

  if (loading) return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Loading data...</h5>
          <p className="text-muted">Please wait a moment</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-4" style={{ maxWidth: "1400px" }}>
      {/* Alerts */}
      {error && <div className="alert alert-danger alert-dismissible fade show shadow-sm border-0" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
        <button type="button" className="btn-close" onClick={clearAlerts}></button>
      </div>}
      {success && <div className="alert alert-success alert-dismissible fade show shadow-sm border-0" role="alert">
        <i className="bi bi-check-circle-fill me-2"></i>
        {success}
        <button type="button" className="btn-close" onClick={clearAlerts}></button>
      </div>}

      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-3 p-2 me-3">
              <i className="bi bi-calendar-event text-white fs-4"></i>
            </div>
            <div>
              <h2 className="fw-bold mb-0 text-dark">Event Management</h2>
              <p className="text-muted mb-0">Create and manage your events</p>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary btn-lg shadow-sm" style={{ borderRadius: "12px" }}>
            <i className="bi bi-plus-circle me-2"></i> Create New Event
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            <div className="card-body text-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="fw-bold mb-1">{events.length}</h3>
                  <p className="mb-0 opacity-75">Approved</p>
                </div>
                <i className="bi bi-check-circle fs-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
            <div className="card-body text-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="fw-bold mb-1">{pendingEvents.length}</h3>
                  <p className="mb-0 opacity-75">Pending</p>
                </div>
                <i className="bi bi-clock-history fs-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
            <div className="card-body text-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="fw-bold mb-1">{events.filter(e => e.statusInfo.label === "Ongoing").length}</h3>
                  <p className="mb-0 opacity-75">Ongoing</p>
                </div>
                <i className="bi bi-play-circle fs-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }}>
            <div className="card-body text-white">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="fw-bold mb-1">{events.filter(e => e.statusInfo.label === "Completed").length}</h3>
                  <p className="mb-0 opacity-75">Completed</p>
                </div>
                <i className="bi bi-check2-circle fs-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button onClick={() => setActiveTab("approved")} className={`nav-link ${activeTab === "approved" ? "active" : ""}`}>Approved Events</button>
        </li>
        <li className="nav-item">
          <button onClick={() => setActiveTab("pending")} className={`nav-link ${activeTab === "pending" ? "active" : ""}`}>Pending Approval</button>
        </li>
      </ul>

      {/* Event Cards */}
      <div className="row">
        {getCurrentEvents().map(event => (
          <div key={event.id} className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                <h5 className="card-title fw-bold">{event.name}</h5>
                <p className="card-text text-muted mb-1">{event.category}</p>
                <p className="card-text mb-1">
                  <i className="bi bi-geo-alt me-1"></i>{event.location}
                </p>
                <p className="card-text mb-1">
                  <i className="bi bi-calendar-event me-1"></i>{event.date} {event.time}
                </p>
                <span className={`badge ${event.statusInfo.badge} mb-2`}>
                  <i className={`bi ${event.statusInfo.icon} me-1`}></i>{event.statusInfo.label}
                </span>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-between">
                <button onClick={() => handleViewEventDetails(event.id)} className="btn btn-outline-primary btn-sm">Details</button>
                {activeTab === "pending" && (
                  <>
                    <button onClick={() => handleApproveEvent(event.id)} className="btn btn-success btn-sm" disabled={actionLoading[`approve-${event.id}`]}>
                      {actionLoading[`approve-${event.id}`] ? "Approving..." : "Approve"}
                    </button>
                    <button onClick={() => handleDeleteEvent(event.id)} className="btn btn-danger btn-sm" disabled={actionLoading[`delete-${event.id}`]}>
                      {actionLoading[`delete-${event.id}`] ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Create New Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <form onSubmit={handleCreateEvent}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Event Title</label>
                    <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" value={newEvent.description} onChange={handleInputChange} className="form-control" rows={3} required></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Time</label>
                      <input type="datetime-local" name="startTime" value={newEvent.startTime} onChange={handleInputChange} className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">End Time</label>
                      <input type="datetime-local" name="endTime" value={newEvent.endTime} onChange={handleInputChange} className="form-control" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Max Participants</label>
                    <input type="number" name="maxParticipants" value={newEvent.maxParticipants} onChange={handleInputChange} className="form-control" min={1} required />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select name="categoryId" value={newEvent.categoryId} onChange={handleInputChange} className="form-select" required>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Venue</label>
                      <select name="venueId" value={newEvent.venueId} onChange={handleInputChange} className="form-select" required>
                        <option value="">Select Venue</option>
                        {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={actionLoading.create}>
                    {actionLoading.create ? "Creating..." : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
