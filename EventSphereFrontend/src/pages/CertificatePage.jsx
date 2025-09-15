import CertificateCard from "../components/public/CertificateCard";

function CertificatePage() {
  return (
    <div className="page-section bg-light">
      <div className="container-fluid p-4">
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="mb-3">
              <i className="bi bi-list-ul me-2"></i>CERTIFICATE LIST
            </h3>
            <CertificateCard></CertificateCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
