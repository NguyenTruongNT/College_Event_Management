// src/components/public/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Event Sphere</h5>
            <p>
              Leading event management platform for students and organizations,
              providing a modern and professional experience.
            </p>
          </div>
          <div className="col-md-1 mb-3"></div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/events" className="text-white text-decoration-none">
                  Events
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact</h5>
            <p>Email: support@eventsphere.com</p>
            <p>Phone: +84 123 456 789</p>
            <p>Address: 175 Tay Son, Kim Lien, Hanoi, Vietnam</p>
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
