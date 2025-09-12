// src/components/public/HomeHero.jsx
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <div className="bg-primary text-white text-center py-5 position-relative w-100">
      {/* Overlay để làm nổi bật text */}
      <div className="bg-dark bg-opacity-50 w-100 h-100 position-absolute top-0 start-0"></div>

      <div className="position-relative z-1">
        <h1 className="display-4 fw-bold mb-3">
          Chào mừng đến với Event Sphere
        </h1>
        <p className="lead mb-4">
          Nền tảng quản lý sự kiện hàng đầu cho sinh viên và tổ chức
        </p>
        <div className="alert alert-warning text-dark mb-4">
          Sự kiện nổi bật:{" "}
          <Link to="/events/ai-2024" className="text-dark fw-bold">
            Hội thảo Công nghệ AI 2025 - Đăng ký ngay!
          </Link>
        </div>
        <Link to="/events" className="btn btn-light btn-lg mt-4">
          Khám phá sự kiện
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
