// src/components/public/CertificateCard.jsx
// function CertificateCard({ title, date }) {
//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         <h5>{title}</h5>
//         <p>Ngày cấp: {date}</p>
//         <button className="btn btn-primary">Tải xuống</button>
//       </div>
//     </div>
//   );
// }
function CertificateCard() {
  return (
    <div className="">
      <div
        className="card shadow-sm mb-4"
        style={{
          borderRadius: "15px",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        }}
      >
        <div className="card-header">
          <h6>
            <i className="bi bi-certificate-fill me-2"></i>Chứng chỉ của tôi
          </h6>
        </div>
        <div className="card-body">
          <div className="list-group list-group-flush">
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">AI Workshop 2024</div>
                <small className="text-muted">Ngày cấp: 10/12/2024</small>
              </div>
              <button className="btn btn-sm btn-outline-success">
                Tải xuống
              </button>
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">Design Thinking</div>
                <small className="text-muted">Ngày cấp: 05/04/2025</small>
              </div>
              <button className="btn btn-sm btn-outline-success">
                Tải xuống
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
