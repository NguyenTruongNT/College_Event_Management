import FavoritePhotos from "../components/public/FavoritePhotos";

function FavoritePhotosPage() {
  return (
    <div>
      <div className="page-section bg-light">
        <div className="container-fluid p-4">
          <div className="row mb-4">
            <div className="col-12">
              <h3 className="mb-3">
                <i className="bi bi-list-ul me-2"></i>FAVORITE PHOTOS LIST
              </h3>
              <FavoritePhotos></FavoritePhotos>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FavoritePhotosPage;