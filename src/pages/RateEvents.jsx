import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

// Khởi tạo icon (chạy một lần)
library.add(faStar);

const RateEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("review");
  const [ratings, setRatings] = useState({
    overall: 0,
    organization: 0,
    content: 0,
    venue: 0,
    coordination: 0,
    technical: 0,
    service: 0,
  });
  const [formData, setFormData] = useState({
    userType: "",
    eventName: "",
    comments: "",
  });
  const [reviews, setReviews] = useState([
    {
      name: "Nguyễn Văn A",
      userType: "Chuyên gia",
      event: "Hội thảo Công nghệ 2024",
      rating: 5,
      comment: "Sự kiện rất chất lượng với nội dung phong phú...",
      venue: 5,
      organization: 5,
      technical: 4,
      service: 5,
      date: "2 ngày trước",
    },
    {
      name: "Trần Thị B",
      userType: "Sinh viên",
      event: "Workshop AI & Machine Learning",
      rating: 4,
      comment: "Workshop rất bổ ích cho sinh viên...",
      venue: 4,
      organization: 4,
      technical: 4,
      service: 4,
      date: "5 ngày trước",
    },
    {
      name: "Lê Minh C",
      userType: "Đại diện doanh nghiệp",
      event: "Startup Summit Vietnam",
      rating: 3,
      comment: "Sự kiện có nhiều startup thú vị...",
      venue: 4,
      organization: 3,
      technical: 3,
      service: 3,
      date: "1 tuần trước",
    },
  ]);
  const [filters, setFilters] = useState({
    event: "",
    rating: "",
    userType: "",
  });

  const handleStarClick = (ratingType, value) => {
    setRatings((prev) => ({ ...prev, [ratingType]: value }));
  };

  const handleStarHover = (ratingType, value, stars) => {
    Array.from(stars).forEach((star, index) => {
      star.style.color = index < value ? "#ffc107" : "#ddd";
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.userType || !formData.eventName) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    alert(
      "Cảm ơn bạn đã gửi đánh giá! Phản hồi của bạn sẽ giúp cải thiện chất lượng sự kiện."
    );
    setFormData({ userType: "", eventName: "", comments: "" });
    setRatings({
      overall: 0,
      organization: 0,
      content: 0,
      venue: 0,
      coordination: 0,
      technical: 0,
      service: 0,
    });
    // Reset sao
    document
      .querySelectorAll(".star")
      .forEach((star) => (star.style.color = "#ddd"));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterReviews = () => {
    let filtered = [...reviews];
    if (filters.event)
      filtered = filtered.filter((r) => r.event === filters.event);
    if (filters.rating)
      filtered = filtered.filter((r) => r.rating === parseInt(filters.rating));
    if (filters.userType)
      filtered = filtered.filter((r) =>
        r.userType.toLowerCase().includes(filters.userType.toLowerCase())
      );
    return filtered;
  };

  const handleLoadMore = () => {
    const newReview = {
      name: "Phạm Thị D",
      userType: "Giảng viên",
      event: "Chuyển đổi số doanh nghiệp",
      rating: 5,
      comment: "Nội dung sự kiện rất thực tiễn và cập nhật...",
      venue: 5,
      organization: 5,
      technical: 5,
      service: 4,
      date: "2 tuần trước",
    };
    setReviews((prev) => [...prev, newReview]);
  };

  const reviewRef = useRef(null);

  useEffect(() => {
    const cards = reviewRef.current?.querySelectorAll(".review-card");
    cards?.forEach((card) => {
      card.addEventListener(
        "mouseenter",
        () => (card.style.transform = "translateY(-2px)")
      );
      card.addEventListener(
        "mouseleave",
        () => (card.style.transform = "translateY(0)")
      );
    });
    return () =>
      cards?.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
  }, [reviews]);

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="main-container"
        style={{
          width: "100%",

          background: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          className="header-section"
          style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1>
            <i className="fas fa-star me-2"></i>Đánh Giá Sự Kiện
          </h1>
          <p className="mb-0">
            Chia sẻ trải nghiệm và góp ý của bạn để cải thiện chất lượng sự kiện
          </p>
        </div>
        <div className="p-4">
          <ul className="nav nav-tabs" id="mainTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                onClick={() => setActiveTab("review")}
                type="button"
              >
                <i className="fas fa-edit me-2"></i>Gửi Đánh Giá
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "view" ? "active" : ""}`}
                onClick={() => setActiveTab("view")}
                type="button"
              >
                <i className="fas fa-eye me-2"></i>Xem Đánh Giá
              </button>
            </li>
          </ul>
          <div className="tab-content mt-4">
            <div
              className={`tab-pane fade ${
                activeTab === "review" ? "show active" : ""
              }`}
              id="review-pane"
            >
              <form id="reviewForm" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <i className="fas fa-user me-2"></i>Loại Người Dùng
                    </label>
                    <select
                      className="form-select"
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e9ecef",
                        padding: "12px 15px",
                        transition: "border-color 0.3s",
                      }}
                    >
                      <option value="">Chọn loại người dùng</option>
                      <option value="student">Sinh viên</option>
                      <option value="professional">Chuyên gia</option>
                      <option value="academic">
                        Giảng viên/Nghiên cứu viên
                      </option>
                      <option value="industry">Đại diện doanh nghiệp</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold">
                      <i className="fas fa-calendar me-2"></i>Tên Sự Kiện
                    </label>
                    <select
                      className="form-select"
                      id="eventName"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleInputChange}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e9ecef",
                        padding: "12px 15px",
                        transition: "border-color 0.3s",
                      }}
                    >
                      <option value="">Chọn sự kiện đã tham dự</option>
                      <option value="tech-conference-2024">
                        Hội thảo Công nghệ 2024
                      </option>
                      <option value="startup-summit">
                        Startup Summit Vietnam
                      </option>
                      <option value="ai-workshop">
                        Workshop AI & Machine Learning
                      </option>
                      <option value="digital-transformation">
                        Chuyển đổi số doanh nghiệp
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="fas fa-star me-2"></i>Đánh Giá Tổng Thể
                  </h5>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Trải nghiệm tổng thể</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="overall"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() => handleStarClick("overall", i + 1)}
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "overall",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "overall",
                                ratings.overall,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color: i < ratings.overall ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Chất lượng tổ chức</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="organization"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() =>
                              handleStarClick("organization", i + 1)
                            }
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "organization",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "organization",
                                ratings.organization,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color:
                                i < ratings.organization ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Phù hợp nội dung</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="content"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() => handleStarClick("content", i + 1)}
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "content",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "content",
                                ratings.content,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color: i < ratings.content ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="fas fa-cogs me-2"></i>Đánh Giá Chi Tiết
                  </h5>
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Địa điểm</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="venue"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() => handleStarClick("venue", i + 1)}
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "venue",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "venue",
                                ratings.venue,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color: i < ratings.venue ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Sự phối hợp</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="coordination"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() =>
                              handleStarClick("coordination", i + 1)
                            }
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "coordination",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "coordination",
                                ratings.coordination,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color:
                                i < ratings.coordination ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Kỹ thuật</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="technical"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() => handleStarClick("technical", i + 1)}
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "technical",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "technical",
                                ratings.technical,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color: i < ratings.technical ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Dịch vụ tiếp đón</label>
                      <div
                        className="star-rating d-flex justify-content-center"
                        data-rating="service"
                      >
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className="star"
                            data-value={i + 1}
                            onClick={() => handleStarClick("service", i + 1)}
                            onMouseEnter={(e) =>
                              handleStarHover(
                                "service",
                                i + 1,
                                e.currentTarget.parentNode.children
                              )
                            }
                            onMouseLeave={(e) =>
                              handleStarHover(
                                "service",
                                ratings.service,
                                e.currentTarget.parentNode.children
                              )
                            }
                            style={{
                              fontSize: "1.5rem",
                              color: i < ratings.service ? "#ffc107" : "#ddd",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="fas fa-comment me-2"></i>Bình Luận & Đề Xuất
                  </label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Chia sẻ ý kiến, đề xuất cải thiện hoặc điểm mạnh của sự kiện..."
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      padding: "12px 15px",
                      transition: "border-color 0.3s",
                    }}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "25px",
                      padding: "12px 30px",
                      fontWeight: "600",
                      transition: "transform 0.2s",
                    }}
                  >
                    <i className="fas fa-paper-plane me-2"></i>Gửi Đánh Giá
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "view" ? "show active" : ""
              }`}
              id="view-pane"
            >
              <div
                className="rating-summary"
                style={{
                  background:
                    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                  borderRadius: "15px",
                  padding: "1.5rem",
                  textAlign: "center",
                  marginBottom: "2rem",
                }}
              >
                <h4 className="fw-bold mb-3">Tổng Quan Đánh Giá</h4>
                <div className="row">
                  <div className="col-md-3 text-center">
                    <div className="display-4 fw-bold text-warning">4.2</div>
                    <div className="star-rating justify-content-center">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`fas fa-star ${
                            i < 4 ? "text-warning" : ""
                          }`}
                          style={{ fontSize: "1rem" }}
                        />
                      ))}
                    </div>
                    <small className="text-muted">Dựa trên 156 đánh giá</small>
                  </div>
                  <div className="col-md-9">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div className="mb-2" key={star}>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{star}★</span>
                          <div
                            className="rating-bar flex-grow-1"
                            style={{
                              background: "#e9ecef",
                              height: "8px",
                              borderRadius: "4px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              className="rating-fill"
                              style={{
                                height: "100%",
                                background:
                                  "linear-gradient(90deg, #ffc107, #ff8c00)",
                                width: `${
                                  star === 5
                                    ? 45
                                    : star === 4
                                    ? 35
                                    : star === 3
                                    ? 15
                                    : star === 2
                                    ? 3
                                    : 2
                                }%`,
                                transition: "width 0.3s ease",
                              }}
                            />
                          </div>
                          <span className="ms-2 small">
                            {star === 5
                              ? 70
                              : star === 4
                              ? 55
                              : star === 3
                              ? 23
                              : star === 2
                              ? 5
                              : 3}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    id="filterEvent"
                    name="event"
                    value={filters.event}
                    onChange={handleFilterChange}
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      padding: "12px 15px",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <option value="">Tất cả sự kiện</option>
                    <option value="tech-conference-2024">
                      Hội thảo Công nghệ 2025
                    </option>
                    <option value="startup-summit">
                      Startup Summit Vietnam
                    </option>
                    <option value="ai-workshop">
                      Workshop AI & Machine Learning
                    </option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    id="filterRating"
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      padding: "12px 15px",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <option value="">Tất cả đánh giá</option>
                    <option value="5">5 sao</option>
                    <option value="4">4 sao</option>
                    <option value="3">3 sao</option>
                    <option value="2">2 sao</option>
                    <option value="1">1 sao</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    id="filterUserType"
                    name="userType"
                    value={filters.userType}
                    onChange={handleFilterChange}
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e9ecef",
                      padding: "12px 15px",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <option value="">Tất cả người dùng</option>
                    <option value="student">Sinh viên</option>
                    <option value="professional">Chuyên gia</option>
                    <option value="academic">Giảng viên</option>
                    <option value="industry">Doanh nghiệp</option>
                  </select>
                </div>
              </div>
              <div id="reviewsList" ref={reviewRef}>
                {filterReviews().map((review, index) => (
                  <div
                    key={index}
                    className="review-card"
                    style={{
                      background: "#f8f9fa",
                      borderLeft: "4px solid #4facfe",
                      borderRadius: "10px",
                      padding: "1.5rem",
                      marginBottom: "1rem",
                      transition: "transform 0.2s",
                    }}
                  >
                    <div className="d-flex align-items-start">
                      <div
                        className="user-avatar me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="mb-1 fw-bold">{review.name}</h6>
                            <small className="text-muted">
                              {review.userType} • {review.event}
                            </small>
                          </div>
                          <div className="text-end">
                            <div className="star-rating justify-content-end">
                              {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon
                                  key={i}
                                  icon={faStar}
                                  className={`fas fa-star ${
                                    i < review.rating ? "text-warning" : "far"
                                  }`}
                                  style={{ fontSize: "1rem" }}
                                />
                              ))}
                            </div>
                            <small className="text-muted">{review.date}</small>
                          </div>
                        </div>
                        <p className="mb-2">{review.comment}</p>
                        <div className="row text-center">
                          <div className="col">
                            <small className="text-muted">Địa điểm</small>
                            <div className="fw-bold text-warning">
                              {review.venue}★
                            </div>
                          </div>
                          <div className="col">
                            <small className="text-muted">Tổ chức</small>
                            <div className="fw-bold text-warning">
                              {review.organization}★
                            </div>
                          </div>
                          <div className="col">
                            <small className="text-muted">Kỹ thuật</small>
                            <div className="fw-bold text-warning">
                              {review.technical}★
                            </div>
                          </div>
                          <div className="col">
                            <small className="text-muted">Dịch vụ</small>
                            <div className="fw-bold text-warning">
                              {review.service}★
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLoadMore}
                  style={{
                    borderRadius: "25px",
                    padding: "10px 20px",
                    transition: "transform 0.2s",
                  }}
                >
                  <i className="fas fa-plus me-2"></i>Xem Thêm Đánh Giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateEvents;
