import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function EventDetailPage() {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Lấy ID sự kiện từ URL, ví dụ /event-detail/1

  // Dữ liệu sự kiện mẫu dựa trên ID
  const eventData = {
    1: {
      name: "Hội thảo Công nghệ AI",
      date: "15/12/2025",
      time: "08:00 - 17:00",
      location: "Hội trường A, Đại học Quốc gia TP.HCM",
      organizer: "Khoa Công nghệ Thông tin",
      category: "Công nghệ",
      speaker: "TS. Nguyễn Văn A",
      certificate: "Có",
      description:
        "Hội thảo sẽ giới thiệu những xu hướng mới nhất trong lĩnh vực trí tuệ nhân tạo (AI), machine learning và ứng dụng thực tế trong các ngành công nghiệp. Các chuyên gia hàng đầu sẽ chia sẻ kinh nghiệm thực tiễn và kiến thức chuyên sâu, mang đến cơ hội học hỏi và kết nối.",
      program: [
        "08:00 - 08:30: Đăng ký và nhận tài liệu",
        "08:30 - 10:00: Phiên 1 - Tổng quan về AI và Machine Learning",
        "10:15 - 11:45: Phiên 2 - Ứng dụng AI trong doanh nghiệp",
        "13:30 - 15:00: Phiên 3 - Workshop thực hành AI",
        "15:15 - 16:45: Phiên 4 - Hỏi đáp và thảo luận",
        "16:45 - 17:00: Trao chứng chỉ và bế mạc",
      ],
      registrations: 120,
      capacity: 150,
      image: "https://via.placeholder.com/800x400?text=Hội+thảo+AI",
    },
    2: {
      name: "Workshop Thiết kế UX/UI",
      date: "18/12/2025",
      time: "14:00 - 17:00",
      location: "Phòng Lab 2, Trường ĐH Mỹ Thuật TP.HCM",
      organizer: "Khoa Thiết kế Đồ họa",
      category: "Thiết kế",
      speaker: "TS. Trần Thị B",
      certificate: "Có",
      description:
        "Workshop thực hành thiết kế UX/UI với các công cụ hiện đại như Figma và Adobe XD, hướng dẫn từ cơ bản đến nâng cao. Thích hợp cho người mới bắt đầu và các nhà thiết kế chuyên nghiệp.",
      program: [
        "14:00 - 15:00: Giới thiệu UX/UI và quy trình thiết kế",
        "15:00 - 16:30: Thực hành thiết kế với Figma",
        "16:30 - 17:00: Phản hồi và trao đổi",
      ],
      registrations: 45,
      capacity: 50,
      image: "https://via.placeholder.com/800x400?text=Workshop+UX/UI",
    },
    3: {
      name: "Seminar Khởi nghiệp",
      date: "10/09/2025",
      time: "09:00 - 12:00",
      location: "Hội trường B, ĐH Kinh tế TP.HCM",
      organizer: "Khoa Quản trị Kinh doanh",
      category: "Khởi nghiệp",
      speaker: "TS. Lê Văn C",
      certificate: "Có",
      description:
        "Seminar cung cấp các chiến lược khởi nghiệp hiệu quả, từ ý tưởng đến thực thi, với sự hướng dẫn từ các doanh nhân thành công. Với mục đích giới thiệu, quảng bá hình ảnh về sự kiện và chương trình, thông tin trên banner giúp khách mời hiểu được chủ đề của sự kiện.",
      program: [
        "09:00 - 10:00: Giới thiệu về khởi nghiệp",
        "10:00 - 11:30: Thảo luận chiến lược và mô hình kinh doanh",
        "11:30 - 12:00: Hỏi đáp và kết nối",
      ],
      registrations: 200,
      capacity: 250,
      image: "https://via.placeholder.com/800x400?text=Seminar+Khởi+nghiệp",
    },
    4: {
      name: "Hội thảo Kinh tế số",
      date: "11/09/2025",
      time: "13:00 - 17:00",
      location: "Hội trường C, ĐH Kinh tế Quốc dân",
      organizer: "Khoa Kinh tế",
      category: "Kinh tế",
      speaker: "TS. Phạm Thị D",
      certificate: "Có",
      description:
        "Hội thảo về kinh tế số và chuyển đổi số doanh nghiệp, tập trung vào các xu hướng mới và công nghệ tiên tiến. Với mục đích giới thiệu, quảng bá hình ảnh về sự kiện và chương trình, thông tin trên banner giúp khách mời hiểu được chủ đề của sự kiện.",
      program: [
        "13:00 - 14:00: Tổng quan kinh tế số",
        "14:00 - 15:30: Thực hành chuyển đổi số",
        "15:30 - 17:00: Thảo luận và trao đổi",
      ],
      registrations: 80,
      capacity: 100,
      image: "https://via.placeholder.com/800x400?text=Hội+thảo+Kinh+tế+số",
    },
  };

  const event = eventData[eventId] || eventData[1]; // Fallback đến sự kiện đầu tiên nếu ID không hợp lệ
  const currentDate = new Date("2025-09-11T14:39:00+07:00"); // Cập nhật thời gian hiện tại: 02:39 PM +07, 11/09/2025
  const eventDate = new Date(event.date);
  const status =
    eventDate > currentDate
      ? "Sắp diễn ra"
      : eventDate.toDateString() === currentDate.toDateString()
      ? "Đang diễn ra"
      : "Đã kết thúc";

  const goBack = () => {
    navigate("/events");
  };

  const getProgressWidth = (registrations, capacity) => {
    return ((registrations / capacity) * 100).toFixed(0) + "%";
  };

  const getRemainingSpots = (registrations, capacity) => {
    return capacity - registrations;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  ); // Kiểm tra token từ localStorage // Trạng thái đăng nhập, thay bằng logic thực tế
  useEffect(() => {
    // Cập nhật trạng thái khi component mount hoặc token thay đổi
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []); // Chạy một lần khi component được mount
  const handleRegister = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập tài khoản để thực hiện đăng ký!");
    } else {
      alert("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.");
    }
  };

  const handleShare = (platform) => {
    alert(`Chia sẻ sự kiện trên ${platform} thành công!`);
  };

  const handleAddToCalendar = (service) => {
    alert(`Đã thêm sự kiện vào ${service}. Vui lòng kiểm tra lịch của bạn.`);
  };

  return (
    <div className="page-section bg-light py-5" id="eventDetailSection">
      <div className="container-fluid p-4">
        <button
          className="btn btn-outline-secondary mb-4"
          onClick={goBack}
          style={{
            borderRadius: "25px",
            padding: "8px 20px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#6c757d";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#6c757d";
          }}
        >
          <i className="bi bi-arrow-left me-2"></i>Quay lại
        </button>

        <div className="row">
          <div className="col-lg-8">
            <div
              className="card shadow-sm mb-4"
              style={{
                borderRadius: "15px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src="https://viet-power.vn/wp-content/uploads/2024/06/banner-su-kien-12.jpg"
                alt={event.name}
                className="card-img-top"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
              <div className="card-body p-4">
                <h2
                  className="card-title mb-3"
                  style={{ color: "#2c3e50", fontSize: "2.5rem" }}
                >
                  {event.name}
                </h2>
                <div
                  className="mb-4"
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span
                    className="badge"
                    style={{
                      background: "linear-gradient(45deg, #007bff, #0056b3)",
                      color: "white",
                      borderRadius: "20px",
                      padding: "8px 15px",
                      fontSize: "1rem",
                    }}
                  >
                    {event.date}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background:
                        status === "Sắp diễn ra"
                          ? "#28a745"
                          : status === "Đang diễn ra"
                          ? "#17a2b8"
                          : "#dc3545",
                      color: "white",
                      borderRadius: "20px",
                      padding: "8px 15px",
                      fontSize: "1rem",
                    }}
                  >
                    {status}
                  </span>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <p style={{ marginBottom: "15px", color: "#34495e" }}>
                      <i
                        className="bi bi-clock-fill me-2"
                        style={{ color: "#007bff" }}
                      ></i>
                      <strong>Thời gian:</strong> {event.time}
                    </p>
                    <p style={{ marginBottom: "15px", color: "#34495e" }}>
                      <i
                        className="bi bi-geo-alt-fill me-2"
                        style={{ color: "#28a745" }}
                      ></i>
                      <strong>Địa điểm:</strong> {event.location}
                    </p>
                    <p style={{ marginBottom: "15px", color: "#34495e" }}>
                      <i
                        className="bi bi-people-fill me-2"
                        style={{ color: "#17a2b8" }}
                      ></i>
                      <strong>Ban tổ chức:</strong> {event.organizer}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p style={{ marginBottom: "15px", color: "#34495e" }}>
                      <i
                        className="bi bi-tag-fill me-2"
                        style={{ color: "#ffc107" }}
                      ></i>
                      <strong>Danh mục:</strong> {event.category}
                    </p>
                    <p style={{ marginBottom: "15px", color: "#34495e" }}>
                      <i
                        className="bi bi-person-fill me-2"
                        style={{ color: "#6c757d" }}
                      ></i>
                      <strong>Diễn giả:</strong> {event.speaker}
                    </p>
                    <p style={{ marginBottom: "15px", color: "#34495e" }}>
                      <i
                        className="bi bi-award-fill me-2"
                        style={{ color: "#dc3545" }}
                      ></i>
                      <strong>Chứng chỉ:</strong> {event.certificate}
                    </p>
                  </div>
                </div>

                <h5 style={{ color: "#2c3e50", marginBottom: "15px" }}>
                  Mô tả sự kiện
                </h5>
                <p
                  style={{
                    color: "#7f8c8d",
                    lineHeight: "1.8",
                    marginBottom: "20px",
                  }}
                >
                  {event.description}
                </p>

                <h5 style={{ color: "#2c3e50", marginBottom: "15px" }}>
                  Chương trình
                </h5>
                <ul className="list-group list-group-flush mb-4">
                  {event.program.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      style={{
                        border: "none",
                        padding: "10px 0",
                        color: "#34495e",
                        background: "transparent",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#f8f9fa")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <h6
                  style={{
                    color: "#2c3e50",
                    marginTop: "25px",
                    marginBottom: "15px",
                  }}
                >
                  Thêm vào lịch
                </h6>
                <div
                  style={{ display: "flex", gap: "15px", marginBottom: "25px" }}
                >
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleAddToCalendar("Google Calendar")}
                    style={{ borderRadius: "25px", padding: "8px 20px" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#4285f4")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i className="bi bi-google me-2"></i>Google Calendar
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleAddToCalendar("Outlook")}
                    style={{ borderRadius: "25px", padding: "8px 20px" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0078d4")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i className="bi bi-microsoft me-2"></i>Outlook
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleAddToCalendar("ICS")}
                    style={{ borderRadius: "25px", padding: "8px 20px" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#28a745")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    <i className="bi bi-download me-2"></i>Tải ICS
                  </button>
                </div>

                <h6
                  style={{
                    color: "#2c3e50",
                    marginTop: "25px",
                    marginBottom: "15px",
                  }}
                >
                  Chia sẻ sự kiện
                </h6>
                <div style={{ display: "flex", gap: "15px" }}>
                  <button
                    className="btn"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#3b5998",
                      color: "white",
                      border: "none",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleShare("Facebook")}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#2d4373")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#3b5998")
                    }
                  >
                    <i
                      className="bi bi-facebook"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </button>
                  <button
                    className="btn"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#1da1f2",
                      color: "white",
                      border: "none",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleShare("Twitter")}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0d8bd9")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#1da1f2")
                    }
                  >
                    <i
                      className="bi bi-twitter"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </button>
                  <button
                    className="btn"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#0077b5",
                      color: "white",
                      border: "none",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleShare("LinkedIn")}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#005a87")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#0077b5")
                    }
                  >
                    <i
                      className="bi bi-linkedin"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </button>
                  <button
                    className="btn"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#25d366",
                      color: "white",
                      border: "none",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleShare("WhatsApp")}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#128c7e")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#25d366")
                    }
                  >
                    <i
                      className="bi bi-whatsapp"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "15px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
              }}
            >
              <div className="card-body p-4">
                <h5
                  className="card-title"
                  style={{ color: "#2c3e50", marginBottom: "20px" }}
                >
                  <i
                    className="bi bi-ticket-perforated me-2"
                    style={{ color: "#007bff" }}
                  ></i>
                  Đăng ký tham gia
                </h5>
                <div style={{ marginBottom: "20px" }}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{ color: "#34495e" }}>
                      Đã đăng ký:{" "}
                      <strong>
                        {event.registrations}/{event.capacity}
                      </strong>
                    </span>
                    <span className="text-success">
                      {getRemainingSpots(event.registrations, event.capacity)}{" "}
                      chỗ trống
                    </span>
                  </div>
                  <div
                    className="progress"
                    style={{
                      height: "12px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: getProgressWidth(
                          event.registrations,
                          event.capacity
                        ),
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                  <small className="text-muted d-block text-center mt-2">
                    Còn lại{" "}
                    {getRemainingSpots(event.registrations, event.capacity)} chỗ
                  </small>
                </div>
                <button
                  className="btn btn-primary w-100 mb-3"
                  onClick={handleRegister}
                  style={{
                    borderRadius: "25px",
                    padding: "10px 0",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#4c6ef5")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#007bff")
                  }
                >
                  <i
                    className="bi bi-person-plus-fill me-2"
                    style={{ color: "white" }}
                  ></i>
                  Đăng ký ngay
                </button>
                <div className="text-center">
                  <small className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Miễn phí • {event.certificate} chứng chỉ
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
