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
    alert("Settings saved!");
  };

  return (
    <div className="container my-4">
      <h4 className="fw-bold mb-4">
        <i className="bi bi-gear-fill me-2"></i> System Settings
      </h4>

      <Row>
        {/* Left column */}
        <Col md={8}>
          {/* Security Settings */}
          <Card className="mb-4 shadow-sm">
            <Card.Header className="fw-bold">
              <i className="bi bi-shield-fill-check me-2 text-danger"></i> Security Settings
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="twoFA"
                label="Require Two-Factor Authentication (2FA)"
                checked={settings.twoFA}
                onChange={handleChange}
                name="twoFA"
                className="mb-3"
              />
              <Form.Group className="mb-3">
                <Form.Label>
                  Session Timeout (minutes)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={settings.sessionTimeout}
                  name="sessionTimeout"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Maximum Login Attempts</Form.Label>
                <Form.Control
                  type="number"
                  value={settings.maxLoginAttempts}
                  name="maxLoginAttempts"
                  onChange={handleChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">
              <i className="bi bi-bell-fill me-2 text-dark"></i> Notification Settings
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="emailNotification"
                label="Send Email Notifications"
                checked={settings.emailNotification}
                onChange={handleChange}
                name="emailNotification"
                className="mb-3"
              />
              <Form.Check
                type="switch"
                id="autoAlert"
                label="Automatic System Alerts"
                checked={settings.autoAlert}
                onChange={handleChange}
                name="autoAlert"
                className="mb-3"
              />
              <Form.Group>
                <Form.Label>Primary Administrator Email</Form.Label>
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

        {/* Right column */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">
              <i className="bi bi-info-circle-fill me-2"></i> System Information
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Version:</strong> v2.1.0
              </p>
              <p>
                <strong>Last Update:</strong> 08/15/2025
              </p>
              <p>
                <strong>Uptime:</strong> 99.9%
              </p>
              <p>
                <strong>Storage Used:</strong> 2.3GB / 10GB
              </p>

              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-arrow-repeat me-1"></i> Check for Updates
                </Button>
                <Button variant="outline-warning" size="sm">
                  <i className="bi bi-hdd-stack me-1"></i> Backup Data
                </Button>
                <Button variant="outline-info" size="sm">
                  <i className="bi bi-journal-text me-1"></i> View System Logs
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-end mt-3">
        <Button variant="success" onClick={handleSave}>
          <i className="bi bi-save me-2"></i> Save Settings
        </Button>
      </div>
    </div>
  );
}