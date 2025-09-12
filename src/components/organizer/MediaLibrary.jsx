import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { TrashFill, Upload } from "react-bootstrap-icons";

const MediaLibrary = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          <i class="bi-images me-2"></i>Thư viện ảnh &amp; Video
        </h3>
        <Button variant="primary">
          <Upload className="me-2" />
          Tải lên media
        </Button>
      </div>

      <Row>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-end">
                <Button variant="danger" size="sm">
                  <TrashFill />
                </Button>
              </div>
              <div className="mt-4">
                <p className="text-muted">Hình ảnh sự kiện</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100px" }}
              >
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <p className="text-muted mt-3">Video sự kiện</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MediaLibrary;
