import React from "react";
import { Button, Card, Col, Form, Row, ProgressBar } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

const Reports = () => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          <i className="bi-bar-chart me-2"></i>Reports & Statistics
        </h3>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Select>
            <option>Select Event</option>
            <option>Event 1</option>
            <option>Event 2</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select>
            <option>Report Type</option>
            <option>Attendance Report</option>
            <option>Feedback Report</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-md-end mt-2 mt-md-0">
          <Button variant="success">
            <Download className="me-2" />
            Download Report
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>Attendance Statistics</Card.Header>
            <Card.Body style={{ height: "200px" }}>
              {/* Chart or statistics content to be added here */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Header>Event Feedback</Card.Header>
            <Card.Body>
              <p>5 Stars</p>
              <ProgressBar
                now={65}
                label="65%"
                variant="success"
                className="mb-2"
              />
              <p>4 Stars</p>
              <ProgressBar
                now={25}
                label="25%"
                variant="info"
                className="mb-2"
              />
              <p>3 Stars</p>
              <ProgressBar now={8} label="8%" variant="warning" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
