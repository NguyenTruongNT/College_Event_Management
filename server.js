const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load .env

const app = express();
app.use(express.json()); // Middleware parse JSON
app.use((req, res, next) => {
  console.log("Body received:", req.body); // Debug body
  next();
});

// Add Swagger
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Import middleware và controller
const { auth, requireRole } = require("./middlewares/auth");
const userController = require("./controllers/userController");
const eventController = require("./controllers/eventController");

// Routes User
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/profile", auth, userController.getProfile);
app.get("/users", auth, requireRole([1]), userController.getUsers); // Chỉ admin
app.put(
  "/users/:id/role",
  auth,
  requireRole([1]),
  userController.updateUserRole
); // Chỉ admin
app.put("/users/:id", auth, requireRole([1]), userController.updateUser); // Chỉ admin
app.delete("/users/:id", auth, requireRole([1]), userController.deleteUser); // Chỉ admin

// Routes Events
app.get("/events", eventController.getEvents); // Public
app.get(
  "/events/pending",
  auth,
  requireRole([1, 2]),
  eventController.getPendingEvents
); // Admin/Organizer
app.post("/events", auth, requireRole([1, 2]), eventController.createEvent); // Admin/Organizer
app.put("/events/:id", auth, requireRole([1, 2]), eventController.updateEvent); // Admin/Organizer
app.delete("/events/:id", auth, requireRole([1]), eventController.deleteEvent); // Chỉ admin
app.put(
  "/events/:id/approve",
  auth,
  requireRole([1]),
  eventController.approveEvent
); // Chỉ admin
app.get("/events/:id", eventController.getEventDetail); // Public
app.get(
  "/events/:id/registrations",
  auth,
  eventController.getEventRegistrations
); // Bảo vệ auth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
  console.log(`Swagger Docs tại http://localhost:${PORT}/api-docs`);
});
