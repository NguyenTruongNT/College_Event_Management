// src/components/public/NewsCard.jsx
import { Link } from "react-router-dom";

const NewsCard = ({ title, date, summary, imageUrl, link }) => {
  return (
    <div
      className="card h-100"
      style={{ transition: "all 0.3s ease" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <img
        src={imageUrl}
        className="card-img-top"
        alt={title}
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h6 className="card-title text-primary fw-bold mb-1">{title}</h6>
        <p className="text-muted small mb-1">{date}</p>
        <p className="card-text">{summary}</p>
        <Link to={link} className="btn btn-primary btn-sm mt-auto">
          Đọc thêm
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
