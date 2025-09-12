import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    twoFA: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    emailNotification: true,
    autoAlert: true,
    adminEmail: "admin@system.com",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Đã lưu cài đặt!");
  };

  return (
    <div className="container my-4">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-gear-fill me-2"></i> Cài đặt Hệ thống
      </h4>

      <Row>
        {/* Cột bên trái */}
        <Col md={8}>
          {/* Cài đặt bảo mật */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">
              <i className="bi bi-shield-fill-check me-2 text-danger"></i> Cài
              đặt Bảo mật
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="twoFA"
                label="Yêu cầu xác thực 2 yếu tố (2FA)"
                checked={settings.twoFA}
                onChange={handleChange}
                name="twoFA"
                className="mb-3"
              />
              <Form.Group className="mb-3">
                <Form.Label>
                  Thời gian hết hạn phiên đăng nhập (phút)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={settings.sessionTimeout}
                  name="sessionTimeout"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Số lần đăng nhập sai tối đa</Form.Label>
                <Form.Control
                  type="number"
                  value={settings.maxLoginAttempts}
                  name="maxLoginAttempts"
                  onChange={handleChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Cài đặt Thông báo */}
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">
              <i className="bi bi-bell-fill me-2 text-dark"></i> Cài đặt Thông
              báo
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="emailNotification"
                label="Gửi thông báo qua email"
                checked={settings.emailNotification}
                onChange={handleChange}
                name="emailNotification"
                className="mb-3"
              />
              <Form.Check
                type="switch"
                id="autoAlert"
                label="Cảnh báo hệ thống tự động"
                checked={settings.autoAlert}
                onChange={handleChange}
                name="autoAlert"
                className="mb-3"
              />
              <Form.Group>
                <Form.Label>Email quản trị viên chính</Form.Label>
                <Form.Control
                  type="email"
                  value={settings.adminEmail}
                  name="adminEmail"
                  onChange={handleChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Cột bên phải */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">
              <i className="bi bi-info-circle-fill me-2"></i> Thông tin Hệ thống
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Phiên bản:</strong> v2.1.0
              </p>
              <p>
                <strong>Cập nhật cuối:</strong> 15/08/2025
              </p>
              <p>
                <strong>Uptime:</strong> 99.9%
              </p>
              <p>
                <strong>Dung lượng sử dụng:</strong> 2.3GB / 10GB
              </p>

              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-arrow-repeat me-1"></i> Kiểm tra cập nhật
                </Button>
                <Button variant="outline-warning" size="sm">
                  <i className="bi bi-hdd-stack me-1"></i> Sao lưu dữ liệu
                </Button>
                <Button variant="outline-info" size="sm">
                  <i className="bi bi-journal-text me-1"></i> Xem logs hệ thống
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-end mt-3">
        <Button variant="success" onClick={handleSave}>
          <i className="bi bi-save me-2"></i> Lưu Cài đặt
        </Button>
      </div>
    </div>
  );
}
