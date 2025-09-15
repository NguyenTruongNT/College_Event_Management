import React, { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    max: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    file: null,
    requireApproval: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit:", formData);
    // Reset
    setFormData({
      name: "",
      category: "",
      description: "",
      location: "",
      max: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      file: null,
      requireApproval: false,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg w-75">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Create New Event</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row g-3">
              {/* Event Name */}
              <div className="col-md-6">
                <label className="form-label">Event Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Category */}
              <div className="col-md-6">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select category</option>
                  <option>Seminar</option>
                  <option>Workshop</option>
                  <option>Course</option>
                  <option>Cultural Event</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label">Event Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              {/* Location & Max participants */}
              <div className="col-md-6">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Max Participants *</label>
                <input
                  type="number"
                  name="max"
                  value={formData.max}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Start Date & Time */}
              <div className="col-md-6">
                <label className="form-label">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* End Date & Time */}
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Upload */}
              <div className="col-12">
                <label className="form-label">Upload Image/Document</label>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              {/* Checkbox */}
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="requireApproval"
                    checked={formData.requireApproval}
                    onChange={handleChange}
                    className="form-check-input"
                    id="approvalCheck"
                  />
                  <label htmlFor="approvalCheck" className="form-check-label">
                    Require registration approval
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer text-end">
            <button type="reset" className="btn btn-secondary me-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
