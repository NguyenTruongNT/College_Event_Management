// src/components/public/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Giới thiệu */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Event Sphere</h5>
            <p>
              Nền tảng quản lý sự kiện hàng đầu cho sinh viên và tổ chức, mang
              đến trải nghiệm hiện đại và chuyên nghiệp.
            </p>
          </div>
          <div className="col-md-1 mb-3"></div>
          {/* Liên kết nhanh */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/events" className="text-white text-decoration">
                  Sự kiện
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Liên hệ</h5>
            <p>Email: support@eventsphere.com</p>
            <p>Điện thoại: +84 123 456 789</p>
            <p>Địa chỉ: 175 Tây Sơn, Kim Liên, Hà Nội</p>
            <div>
              <h4>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-twitter"></i>
                </a>
              </h4>
            </div>
          </div>
        </div>

        <hr className="bg-light" />
        <p className="text-center mb-0">
          &copy; 2025 EventSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
