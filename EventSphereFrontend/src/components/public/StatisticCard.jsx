// src/components/public/StatisticCard.jsx
const StatisticCard = ({ icon, number, title, subtitle }) => {
  return (
    <div
      className="card text-center p-3 m-2"
      style={{ transition: "all 0.3s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        e.currentTarget.style.backgroundColor = "#f8f9fa";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.backgroundColor = "white";
      }}
    >
      <div className="card-body">
        <i className={`bi ${icon} display-5 text-primary mb-3`}></i>
        <h3 className="card-title fw-bold text-primary">{number}</h3>
        <p className="card-text">{title}</p>
        <small className="text-muted">{subtitle}</small>
      </div>
    </div>
  );
};

export default StatisticCard;
