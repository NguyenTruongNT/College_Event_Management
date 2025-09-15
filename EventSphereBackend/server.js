const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // Load .env

const app = express();
app.use(express.json()); // Middleware parse JSON
app.use((req, res, next) => {
  console.log("Body received:", req.body); // Debug body
  next();
});

// Serve static files for certificates and media
app.use("/certificates", express.static(path.join(__dirname, "certificates")));
app.use("/media", express.static(path.join(__dirname, "media")));

// Add Swagger
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Import middleware và controller
const { auth, requireRole } = require("./middlewares/auth");
const userController = require("./controllers/userController");
const eventController = require("./controllers/eventController");

// ---------------- API ROUTES ----------------
// Routes User
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/profile", auth, userController.getProfile);
app.put("/profile", auth, userController.updateUserProfile); // Cho user tự sửa
app.put("/profile/password", auth, userController.changePassword); // Cho user đổi mật khẩu
app.get("/users", auth, requireRole([1]), userController.getUsers); // Chỉ admin
app.put("/users/:id/role", auth, requireRole([1]), userController.updateUserRole); // Chỉ admin
app.put("/users/:id", auth, requireRole([1]), userController.updateUser); // Chỉ admin
app.delete("/users/:id", auth, requireRole([1]), userController.deleteUser); // Chỉ admin

// Routes Events
app.get("/events", eventController.getEvents); // Public
app.get("/events/pending", auth, requireRole([1, 2]), eventController.getPendingEvents); // Admin/Organizer
app.post("/events", auth, requireRole([1, 2]), eventController.createEvent); // Admin/Organizer
app.put("/events/:id", auth, requireRole([1, 2]), eventController.updateEvent); // Admin/Organizer
app.delete("/events/:id", auth, requireRole([1]), eventController.deleteEvent); // Chỉ admin
app.put("/events/:id/approve", auth, requireRole([1]), eventController.approveEvent); // Chỉ admin
app.get("/events/:id", eventController.getEventDetail); // Public
app.post("/registrations", auth, requireRole([3]), eventController.registerEvent); // Chỉ student
app.post("/attendances", auth, requireRole([3]), eventController.checkInEvent); // Chỉ student
app.post("/feedback", auth, requireRole([3]), eventController.submitFeedback); // Chỉ student
app.get("/events/:id/feedbacks", auth, requireRole([1, 2]), eventController.getEventFeedbacks); // Admin/Organizer
app.put("/feedbacks/:id/approve", auth, requireRole([1, 2]), eventController.approveFeedback); // Admin/Organizer

// Routes Notifications
app.post("/notifications", auth, requireRole([1, 2]), eventController.createNotification); // Admin/Organizer
app.post("/notifications/email", auth, requireRole([1, 2]), eventController.sendEmailNotification); // Admin/Organizer
app.get("/notifications", auth, eventController.getNotifications); // Bảo vệ auth
app.put("/notifications/:id/read", auth, eventController.markNotificationAsRead); // Bảo vệ auth
app.get("/events/:id/registrations", auth, requireRole([1, 2]), eventController.getEventRegistrations); // Admin/Organizer
app.get("/events/:id/attendees", auth, requireRole([1, 2]), eventController.getEventAttendees); // Admin/Organizer
app.post("/certificates", auth, requireRole([1, 2]), eventController.issueCertificate); // Admin/Organizer
app.post("/media", auth, requireRole([1, 2]), eventController.uploadMedia); // Admin/Organizer
app.get("/events/:id/media", auth, requireRole([1, 2]), eventController.getEventMedia); // Admin/Organizer
app.delete("/media/:id", auth, requireRole([1, 2]), eventController.deleteMedia); // Admin/Organizer
app.get("/analytics", auth, requireRole([1]), eventController.getAnalytics); // Chỉ admin

// ---------------- SERVE FRONTEND BUILD ----------------
app.use(express.static(path.join(__dirname, "dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
  console.log(`📖 Swagger Docs tại http://localhost:${PORT}/api-docs`);
  console.log(`🎨 Giao diện tại http://localhost:${PORT}`);
});