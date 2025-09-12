import React from "react";
import { Button, Card, Col, Form, Row, ProgressBar } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

const Reports = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          <i class="bi-bar-chart me-2"></i>Báo cáo &amp; Thống kê
        </h3>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Select>
            <option>Chọn sự kiện</option>
            <option>Sự kiện 1</option>
            <option>Sự kiện 2</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select>
            <option>Loại báo cáo</option>
            <option>Báo cáo tham dự</option>
            <option>Báo cáo đánh giá</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-md-end mt-2 mt-md-0">
          <Button variant="success">
            <Download className="me-2" />
            Tải báo cáo
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>Thống kê tham dự</Card.Header>
            <Card.Body style={{ height: "200px" }}>
              {/* Nội dung biểu đồ/thống kê sẽ thêm sau */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>Đánh giá sự kiện</Card.Header>
            <Card.Body>
              <p>5 sao</p>
              <ProgressBar
                now={65}
                label="65%"
                variant="success"
                className="mb-2"
              />
              <p>4 sao</p>
              <ProgressBar
                now={25}
                label="25%"
                variant="info"
                className="mb-2"
              />
              <p>3 sao</p>
              <ProgressBar now={8} label="8%" variant="warning" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
