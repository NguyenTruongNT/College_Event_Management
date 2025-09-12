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
          <h5 className="mb-0">Tạo sự kiện mới</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row g-3">
              {/* Tên sự kiện */}
              <div className="col-md-6">
                <label className="form-label">Tên sự kiện *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Danh mục */}
              <div className="col-md-6">
                <label className="form-label">Danh mục *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  <option>Hội thảo</option>
                  <option>Workshop</option>
                  <option>Khóa học</option>
                  <option>Sự kiện văn hóa</option>
                </select>
              </div>

              {/* Mô tả */}
              <div className="col-12">
                <label className="form-label">Mô tả sự kiện</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              {/* Địa điểm & Số lượng */}
              <div className="col-md-6">
                <label className="form-label">Địa điểm *</label>
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
                <label className="form-label">Số lượng tối đa *</label>
                <input
                  type="number"
                  name="max"
                  value={formData.max}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Ngày & Giờ bắt đầu */}
              <div className="col-md-6">
                <label className="form-label">Ngày bắt đầu *</label>
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
                <label className="form-label">Giờ bắt đầu *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Ngày & Giờ kết thúc */}
              <div className="col-md-6">
                <label className="form-label">Ngày kết thúc</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Giờ kết thúc</label>
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
                <label className="form-label">Tải lên hình ảnh/tài liệu</label>
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
                    Yêu cầu phê duyệt đăng ký
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer text-end">
            <button type="reset" className="btn btn-secondary me-2">
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Tạo sự kiện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
