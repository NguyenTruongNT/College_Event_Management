const pool = require("../db"); // Import DB pool
const nodemailer = require("nodemailer"); // Import nodemailer
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config(); // Load .env
const { createCanvas } = require("canvas");
const path = require("path");

// Cấu hình transporter cho email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get a list of approved events
 *     description: Returns all events with status approved (Status = 1)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       EventId:
 *                         type: integer
 *                       Title:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       StartTime:
 *                         type: string
 *                         format: date-time
 *                       EndTime:
 *                         type: string
 *                         format: date-time
 *                       MaxParticipants:
 *                         type: integer
 *                       Status:
 *                         type: integer
 *                       VenueName:
 *                         type: string
 *                       CategoryName:
 *                         type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
exports.getEvents = async (req, res) => {
  const getEventsQuery = `
        SELECT e.EventId, e.Title, e.Description, e.StartTime, e.EndTime, e.MaxParticipants, e.Status, v.VenueName, c.CategoryName 
        FROM Events e 
        LEFT JOIN Venues v ON e.VenueId = v.VenueId 
        LEFT JOIN EventCategories c ON e.CategoryId = c.CategoryId 
        WHERE e.Status = 1
    `;
  try {
    const [rows] = await pool.execute(getEventsQuery);
    res.json({ events: rows });
  } catch (err) {
    console.error("Lỗi getEvents:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/pending:
 *   get:
 *     summary: Get a list of pending events
 *     description: Returns all events with status pending (Status = 0) for admin and organizer
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of pending events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pendingEvents:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       EventId:
 *                         type: integer
 *                       Title:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       StartTime:
 *                         type: string
 *                         format: date-time
 *                       EndTime:
 *                         type: string
 *                         format: date-time
 *                       MaxParticipants:
 *                         type: integer
 *                       Status:
 *                         type: integer
 *                       VenueName:
 *                         type: string
 *                       CategoryName:
 *                         type: string
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       500:
 *         description: Server error
 */
exports.getPendingEvents = async (req, res) => {
  const getPendingEventsQuery = `
        SELECT e.EventId, e.Title, e.Description, e.StartTime, e.EndTime, e.MaxParticipants, e.Status, v.VenueName, c.CategoryName 
        FROM Events e 
        LEFT JOIN Venues v ON e.VenueId = v.VenueId 
        LEFT JOIN EventCategories c ON e.CategoryId = c.CategoryId 
        WHERE e.Status = 0
    `;
  try {
    const [rows] = await pool.execute(getPendingEventsQuery);
    res.json({ pendingEvents: rows });
  } catch (err) {
    console.error("Lỗi getPendingEvents:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event (only admin or organizer)
 *     description: Creates a new event with pending status (Status = 0) and optional poster
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - startTime
 *               - endTime
 *               - categoryId
 *               - venueId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               maxParticipants:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               venueId:
 *                 type: integer
 *               posterUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully, awaiting approval
 *       400:
 *         description: Missing required information
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       500:
 *         description: Server error
 */
exports.createEvent = async (req, res) => {
  const {
    title,
    description,
    startTime,
    endTime,
    maxParticipants,
    categoryId,
    venueId,
    posterUrl,
  } = req.body;
  const organizerId = req.user.userId;

  if (!title || !startTime || !endTime || !categoryId || !venueId) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc!" });
  }

  const createEventQuery = `
        INSERT INTO Events (Title, Description, StartTime, EndTime, MaxParticipants, Status, OrganizerId, CategoryId, VenueId, PosterUrl) 
        VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?)
    `;
  try {
    const [result] = await pool.execute(createEventQuery, [
      title,
      description,
      startTime,
      endTime,
      maxParticipants,
      organizerId,
      categoryId,
      venueId,
      posterUrl || null,
    ]);
    res.status(201).json({
      message: "Tạo sự kiện thành công! Chờ phê duyệt.",
      eventId: result.insertId,
    });
  } catch (err) {
    console.error("Lỗi createEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}/approve:
 *   put:
 *     summary: Approve an event (only admin)
 *     description: Updates event status from pending (0) to approved (1)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Approval successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
exports.approveEvent = async (req, res) => {
  const eventId = req.params.id;

  const approveEventQuery = `
        UPDATE Events SET Status = 1, ApproverId = ? WHERE EventId = ?
    `;
  try {
    const [event] = await pool.execute(
      "SELECT * FROM Events WHERE EventId = ?",
      [eventId]
    );
    if (event.length === 0) {
      return res.status(404).json({ error: "Sự kiện không tồn tại!" });
    }
    if (req.user.roleId !== 1) {
      return res.status(403).json({ error: "Chỉ admin được phê duyệt!" });
    }

    await pool.execute(approveEventQuery, [req.user.userId, eventId]);
    res.json({ message: "Phê duyệt sự kiện thành công!" });
  } catch (err) {
    console.error("Lỗi approveEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event (only admin or organizer)
 *     description: Only the organizer of the event or admin can update
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               maxParticipants:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               venueId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden (not authorized)
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
exports.updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const {
    title,
    description,
    startTime,
    endTime,
    maxParticipants,
    categoryId,
    venueId,
  } = req.body;
  const userId = req.user.userId;

  const updateEventQuery = `
        UPDATE Events SET Title = ?, Description = ?, StartTime = ?, EndTime = ?, MaxParticipants = ?, CategoryId = ?, VenueId = ? WHERE EventId = ?
    `;
  try {
    const [event] = await pool.execute(
      "SELECT OrganizerId FROM Events WHERE EventId = ?",
      [eventId]
    );
    if (event.length === 0) {
      return res.status(404).json({ error: "Sự kiện không tồn tại!" });
    }
    if (event[0].OrganizerId !== userId && req.user.roleId !== 1) {
      return res.status(403).json({ error: "Không có quyền chỉnh sửa!" });
    }

    await pool.execute(updateEventQuery, [
      title,
      description,
      startTime,
      endTime,
      maxParticipants,
      categoryId,
      venueId,
      eventId,
    ]);
    res.json({ message: "Cập nhật sự kiện thành công!" });
  } catch (err) {
    console.error("Lỗi updateEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event (only admin)
 *     description: Removes an event from the system
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  const deleteEventQuery = `
        DELETE FROM Events WHERE EventId = ?
    `;
  try {
    const [event] = await pool.execute(
      "SELECT * FROM Events WHERE EventId = ?",
      [eventId]
    );
    if (event.length === 0) {
      return res.status(404).json({ error: "Sự kiện không tồn tại!" });
    }
    if (req.user.roleId !== 1) {
      return res.status(403).json({ error: "Chỉ admin được xóa!" });
    }

    await pool.execute(deleteEventQuery, [eventId]);
    res.json({ message: "Xóa sự kiện thành công!" });
  } catch (err) {
    console.error("Lỗi deleteEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event details
 *     description: Returns detailed information of a specific event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   type: object
 *                   properties:
 *                     EventId:
 *                       type: integer
 *                     Title:
 *                       type: string
 *                     Description:
 *                       type: string
 *                     StartTime:
 *                       type: string
 *                       format: date-time
 *                     EndTime:
 *                       type: string
 *                       format: date-time
 *                     MaxParticipants:
 *                       type: integer
 *                     Status:
 *                       type: integer
 *                     OrganizerId:
 *                       type: integer
 *                     ApproverId:
 *                       type: integer
 *                     CategoryName:
 *                       type: string
 *                     VenueName:
 *                       type: string
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
exports.getEventDetail = async (req, res) => {
  const eventId = req.params.id;

  const getEventDetailQuery = `
        SELECT e.EventId, e.Title, e.Description, e.StartTime, e.EndTime, e.MaxParticipants, e.Status, e.OrganizerId, e.ApproverId, c.CategoryName, v.VenueName 
        FROM Events e 
        LEFT JOIN EventCategories c ON e.CategoryId = c.CategoryId 
        LEFT JOIN Venues v ON e.VenueId = v.VenueId 
        WHERE e.EventId = ?
    `;
  try {
    const [rows] = await pool.execute(getEventDetailQuery, [eventId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Sự kiện không tồn tại!" });
    }
    res.json({ event: rows[0] });
  } catch (err) {
    console.error("Lỗi getEventDetail:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create notifications for frontend
 *     description: Create notifications for a specific user, event participants, or users by role (Admin or Organizer)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
 *                 description: Send to a specific user (optional if eventId or roleId provided)
 *               eventId:
 *                 type: integer
 *                 description: Send to all participants of an event (optional)
 *               roleId:
 *                 type: integer
 *                 description: Send to all users with a specific role (optional, 1=Admin, 2=Organizer, 3=Student)
 *     responses:
 *       201:
 *         description: Notifications created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing information or invalid target
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       500:
 *         description: Server error
 */
exports.createNotification = async (req, res) => {
  const { title, content, userId, eventId, roleId } = req.body;
  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được gửi thông báo!" });
  }
  if (!title || !content || (!userId && !eventId && !roleId)) {
    return res.status(400).json({
      error:
        "Title, content, và ít nhất một target (userId, eventId, hoặc roleId) là bắt buộc!",
    });
  }

  try {
    let userIds = [];
    if (userId) {
      userIds = [userId];
    } else if (eventId) {
      const [participants] = await pool.execute(
        "SELECT DISTINCT r.UserId FROM Registrations r WHERE r.EventId = ? AND r.Status = 0",
        [eventId]
      );
      userIds = participants.map((row) => row.UserId);
    } else if (roleId) {
      const [users] = await pool.execute(
        "SELECT UserId FROM Users WHERE RoleId = ?",
        [roleId]
      );
      userIds = users.map((row) => row.UserId);
    }

    if (userIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Không tìm thấy đối tượng để gửi thông báo!" });
    }

    const promises = userIds.map((uid) =>
      pool.execute(
        "INSERT INTO Notifications (UserId, Title, Message) VALUES (?, ?, ?)",
        [uid, title, content]
      )
    );
    await Promise.all(promises);
    res.status(201).json({ message: "Thông báo đã được tạo cho frontend!" });
  } catch (err) {
    console.error("Lỗi createNotification:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /notifications/email:
 *   post:
 *     summary: Send email notifications
 *     description: Send email notifications to a specific user, event participants, or users by role (Admin or Organizer)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
 *                 description: Send to a specific user (optional if eventId or roleId provided)
 *               eventId:
 *                 type: integer
 *                 description: Send to all participants of an event (optional)
 *               roleId:
 *                 type: integer
 *                 description: Send to all users with a specific role (optional, 1=Admin, 2=Organizer, 3=Student)
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing information or user not found
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       500:
 *         description: Server error
 */
exports.sendEmailNotification = async (req, res) => {
  const { title, content, userId, eventId, roleId } = req.body;
  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được gửi email!" });
  }
  if (!title || !content || (!userId && !eventId && !roleId)) {
    return res.status(400).json({
      error:
        "Title, content, và ít nhất một target (userId, eventId, hoặc roleId) là bắt buộc!",
    });
  }

  try {
    let userEmails = [];
    if (userId) {
      const [user] = await pool.execute(
        "SELECT u.Email, up.FullName FROM Users u LEFT JOIN UserProfiles up ON u.UserId = up.UserId WHERE u.UserId = ?",
        [userId]
      );
      if (user.length === 0) {
        return res.status(400).json({ error: "User không tồn tại!" });
      }
      userEmails.push({
        email: user[0].Email,
        fullName: user[0].FullName || "User",
      });
    } else if (eventId) {
      const [participants] = await pool.execute(
        "SELECT DISTINCT u.Email, up.FullName FROM Registrations r " +
          "LEFT JOIN Users u ON r.UserId = u.UserId " +
          "LEFT JOIN UserProfiles up ON u.UserId = up.UserId " +
          "WHERE r.EventId = ? AND r.Status = 0",
        [eventId]
      );
      userEmails = participants.map((row) => ({
        email: row.Email || "default-email@example.com",
        fullName: row.FullName || "User",
      }));
    } else if (roleId) {
      const [users] = await pool.execute(
        "SELECT u.Email, up.FullName FROM Users u LEFT JOIN UserProfiles up ON u.UserId = up.UserId WHERE u.RoleId = ?",
        [roleId]
      );
      userEmails = users.map((row) => ({
        email: row.Email || "default-email@example.com",
        fullName: row.FullName || "User",
      }));
    }

    if (userEmails.length === 0) {
      return res
        .status(400)
        .json({ error: "Không tìm thấy đối tượng để gửi email!" });
    }

    const promises = userEmails.map((user) =>
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: title,
        text: `Dear ${user.fullName}, \n\n${content}\n\nBest regards,\nEventSphere Team`,
      })
    );
    await Promise.all(promises);
    res.json({ message: "Email thông báo đã được gửi!" });
  } catch (err) {
    console.error("Lỗi sendEmailNotification:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     description: Updates the IsRead status of a notification to 1 for the current user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Notification not found or already read
 *       403:
 *         description: Forbidden (not the owner)
 *       500:
 *         description: Server error
 */
exports.markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.id;
  const userId = req.user.userId;

  try {
    const [notification] = await pool.execute(
      "SELECT * FROM Notifications WHERE NotificationId = ? AND UserId = ?",
      [notificationId, userId]
    );
    if (notification.length === 0) {
      return res
        .status(400)
        .json({ error: "Thông báo không tồn tại hoặc không thuộc về bạn!" });
    }
    if (notification[0].IsRead === 1) {
      return res.status(400).json({ error: "Thông báo đã được đọc!" });
    }

    await pool.execute(
      "UPDATE Notifications SET IsRead = 1 WHERE NotificationId = ?",
      [notificationId]
    );
    res.json({ message: "Thông báo đã được đánh dấu là đã đọc!" });
  } catch (err) {
    console.error("Lỗi markNotificationAsRead:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Get list of user notifications
 *     description: Returns all unread notifications (IsRead = 0) for the current user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       NotificationId:
 *                         type: integer
 *                       UserId:
 *                         type: integer
 *                       Title:
 *                         type: string
 *                       Message:
 *                         type: string
 *                       IsRead:
 *                         type: integer
 *                       CreatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error
 */
exports.getNotifications = async (req, res) => {
  const userId = req.user.userId;

  const getNotificationsQuery = `
        SELECT * FROM Notifications WHERE UserId = ? AND IsRead = 0
    `;
  try {
    const [rows] = await pool.execute(getNotificationsQuery, [userId]);
    res.json({ notifications: rows });
  } catch (err) {
    console.error("Lỗi getNotifications:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Register for an event
 *     description: Allows student to register for an approved event, check max participants
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Event full or invalid
 *       403:
 *         description: Forbidden (not student)
 *       500:
 *         description: Server error
 */
exports.registerEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.userId;

  if (req.user.roleId !== 3) {
    return res.status(403).json({ error: "Chỉ student được đăng ký!" });
  }
  if (!eventId) {
    return res.status(400).json({ error: "EventId là bắt buộc!" });
  }

  try {
    const [event] = await pool.execute(
      "SELECT MaxParticipants, (SELECT COUNT(*) FROM Registrations r WHERE r.EventId = e.EventId AND r.Status = 0) as Registered FROM Events e WHERE EventId = ? AND Status = 1",
      [eventId]
    );
    if (event.length === 0) {
      return res
        .status(400)
        .json({ error: "Sự kiện không tồn tại hoặc chưa được phê duyệt!" });
    }
    if (
      event[0].MaxParticipants &&
      event[0].Registered >= event[0].MaxParticipants
    ) {
      return res.status(400).json({ error: "Sự kiện đã đầy!" });
    }

    await pool.execute(
      "INSERT INTO Registrations (UserId, EventId, Status) VALUES (?, ?, 0)",
      [userId, eventId]
    );
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("Lỗi registerEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /attendances:
 *   post:
 *     summary: Check-in for an event
 *     description: Allows student to check-in for a registered event
 *     tags: [Attendances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Check-in successful
 *       400:
 *         description: Not registered or event not approved
 *       403:
 *         description: Forbidden (not student)
 *       500:
 *         description: Server error
 */
exports.checkInEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.userId;

  if (req.user.roleId !== 3) {
    return res.status(403).json({ error: "Chỉ student được điểm danh!" });
  }
  if (!eventId) {
    return res.status(400).json({ error: "EventId là bắt buộc!" });
  }

  try {
    const [registration] = await pool.execute(
      "SELECT * FROM Registrations WHERE UserId = ? AND EventId = ? AND Status = 0",
      [userId, eventId]
    );
    if (registration.length === 0) {
      return res.status(400).json({ error: "Bạn chưa đăng ký sự kiện này!" });
    }

    await pool.execute(
      "INSERT INTO Attendances (UserId, EventId) VALUES (?, ?)",
      [userId, eventId]
    );
    res.status(201).json({ message: "Điểm danh thành công!" });
  } catch (err) {
    console.error("Lỗi checkInEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Submit feedback for an event
 *     description: Allows student to submit feedback (rating and comment) for an event they attended
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - rating
 *             properties:
 *               eventId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback submitted successfully, awaiting approval
 *       400:
 *         description: Invalid input or not attended
 *       403:
 *         description: Forbidden (not student or not attended)
 *       500:
 *         description: Server error
 */
exports.submitFeedback = async (req, res) => {
  const { eventId, rating, comment } = req.body;
  const userId = req.user.userId;

  if (req.user.roleId !== 3) {
    return res.status(403).json({ error: "Chỉ student được gửi đánh giá!" });
  }
  if (!eventId || !rating || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: "EventId và rating (1-5) là bắt buộc!" });
  }

  try {
    const [attendance] = await pool.execute(
      "SELECT * FROM Attendances WHERE UserId = ? AND EventId = ?",
      [userId, eventId]
    );
    if (attendance.length === 0) {
      return res
        .status(400)
        .json({ error: "Bạn phải tham gia sự kiện để đánh giá!" });
    }

    await pool.execute(
      "INSERT INTO Feedbacks (UserId, EventId, Rating, Comment, IsApproved) VALUES (?, ?, ?, ?, 0)",
      [userId, eventId, rating, comment || null]
    );
    res
      .status(201)
      .json({ message: "Đánh giá đã được gửi thành công, chờ duyệt!" });
  } catch (err) {
    console.error("Lỗi submitFeedback:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}/feedbacks:
 *   get:
 *     summary: Get feedback list for an event
 *     description: Returns all approved feedback for a specific event (for Admin or Organizer)
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved feedback list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FeedbackId:
 *                         type: integer
 *                       UserId:
 *                         type: integer
 *                       EventId:
 *                         type: integer
 *                       Rating:
 *                         type: integer
 *                       Comment:
 *                         type: string
 *                       CreatedAt:
 *                         type: string
 *                         format: date-time
 *                       IsApproved:
 *                         type: integer
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       404:
 *         description: Event not found or no approved feedback
 *       500:
 *         description: Server error
 */
exports.getEventFeedbacks = async (req, res) => {
  const eventId = req.params.id;

  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được xem đánh giá!" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM Feedbacks WHERE EventId = ? AND IsApproved = 1 ORDER BY SubmittedAt DESC",
      [eventId]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Không có đánh giá được duyệt cho sự kiện này!" });
    }
    res.json({ feedbacks: rows });
  } catch (err) {
    console.error("Lỗi getEventFeedbacks:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /feedbacks/{id}/approve:
 *   put:
 *     summary: Approve a feedback
 *     description: Allows admin or organizer to approve a feedback comment
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feedback approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Server error
 */
exports.approveFeedback = async (req, res) => {
  const feedbackId = req.params.id;

  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được duyệt đánh giá!" });
  }

  try {
    const [feedback] = await pool.execute(
      "SELECT * FROM Feedbacks WHERE FeedbackId = ?",
      [feedbackId]
    );
    if (feedback.length === 0) {
      return res.status(404).json({ error: "Đánh giá không tồn tại!" });
    }

    await pool.execute(
      "UPDATE Feedbacks SET IsApproved = 1 WHERE FeedbackId = ?",
      [feedbackId]
    );
    res.json({ message: "Đánh giá đã được duyệt!" });
  } catch (err) {
    console.error("Lỗi approveFeedback:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}/registrations:
 *   get:
 *     summary: Get list of registered participants for an event
 *     description: Returns all registered participants for a specific event (for Admin or Organizer)
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved registration list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 registrations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       UserId:
 *                         type: integer
 *                       EventId:
 *                         type: integer
 *                       FullName:
 *                         type: string
 *                       EnrollmentNo:
 *                         type: string
 *                       Status:
 *                         type: integer
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       404:
 *         description: Event not found or no registrations
 *       500:
 *         description: Server error
 */
exports.getEventRegistrations = async (req, res) => {
  const eventId = req.params.id;

  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được xem danh sách đăng ký!" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT r.UserId, r.EventId, up.FullName, up.EnrollmentNo, r.Status " +
        "FROM Registrations r " +
        "LEFT JOIN UserProfiles up ON r.UserId = up.UserId " +
        "WHERE r.EventId = ? AND r.Status = 0",
      [eventId]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Không có đăng ký cho sự kiện này!" });
    }
    res.json({ registrations: rows });
  } catch (err) {
    console.error("Lỗi getEventRegistrations:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}/attendees:
 *   get:
 *     summary: Get list of attendees for an event
 *     description: Returns all attendees who checked-in for a specific event (for Admin or Organizer)
 *     tags: [Attendances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved attendee list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       UserId:
 *                         type: integer
 *                       EventId:
 *                         type: integer
 *                       FullName:
 *                         type: string
 *                       EnrollmentNo:
 *                         type: string
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       404:
 *         description: Event not found or no attendees
 *       500:
 *         description: Server error
 */
exports.getEventAttendees = async (req, res) => {
  const eventId = req.params.id;

  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được xem danh sách tham gia!" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT a.UserId, a.EventId, up.FullName, up.EnrollmentNo " +
        "FROM Attendances a " +
        "LEFT JOIN UserProfiles up ON a.UserId = up.UserId " +
        "WHERE a.EventId = ?",
      [eventId]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Không có người tham gia cho sự kiện này!" });
    }
    res.json({ attendees: rows });
  } catch (err) {
    console.error("Lỗi getEventAttendees:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /certificates:
 *   post:
 *     summary: Issue a certificate
 *     description: Allows admin or organizer to issue a certificate for an event participant with image generation
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - eventId
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *               isPaid:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Certificate issued successfully with image URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 certificateImageUrl:
 *                   type: string
 *       400:
 *         description: Invalid input or not eligible
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       500:
 *         description: Server error
 */
exports.issueCertificate = async (req, res) => {
  const { userId, eventId, isPaid = false } = req.body;
  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được cấp chứng chỉ!" });
  }
  if (!userId || !eventId) {
    return res.status(400).json({ error: "UserId và eventId là bắt buộc!" });
  }

  try {
    // Kiểm tra hợp lệ: User đã tham gia sự kiện và sự kiện approved
    const [attendance] = await pool.execute(
      "SELECT * FROM Attendances a JOIN Events e ON a.EventId = e.EventId WHERE a.UserId = ? AND a.EventId = ? AND e.Status = 1",
      [userId, eventId]
    );
    if (attendance.length === 0) {
      return res.status(400).json({
        error: "User không tham gia sự kiện hoặc sự kiện chưa được phê duyệt!",
      });
    }

    // Tạo hình ảnh chứng chỉ bằng Canvas
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");

    // Thiết kế nền chứng chỉ (màu xám nhạt)
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, 800, 600);

    // Thêm tiêu đề
    ctx.fillStyle = "#000";
    ctx.font = "bold 30px Arial";
    ctx.fillText("Certificate of Participation", 250, 100);

    // Lấy thông tin sự kiện và user
    const [event] = await pool.execute(
      "SELECT Title, StartTime FROM Events WHERE EventId = ?",
      [eventId]
    );
    const [user] = await pool.execute(
      "SELECT up.FullName FROM Users u LEFT JOIN UserProfiles up ON u.UserId = up.UserId WHERE u.UserId = ?",
      [userId]
    );

    // Thêm thông tin
    ctx.font = "20px Arial";
    ctx.fillText(`Event: ${event[0].Title}`, 50, 200);
    ctx.fillText(
      `Date: ${event[0].StartTime.toISOString().split("T")[0]}`,
      50,
      250
    );
    ctx.fillText(`Participant: ${user[0].FullName || "Unknown"}`, 50, 300);
    ctx.fillText(
      `Certificate ID: CERT-${userId}-${eventId}-${Date.now()}`,
      50,
      350
    );

    // Lưu hình ảnh vào file
    const imagePath = `./certificates/cert-${userId}-${eventId}-${Date.now()}.png`;
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(imagePath, buffer);

    // Lưu URL vào DB
    const certificateImageUrl = `/certificates/${imagePath.split("/").pop()}`; // Đường dẫn tương đối
    await pool.execute(
      "INSERT INTO Certificates (UserId, EventId, CertificateUrl, IsPaid) VALUES (?, ?, ?, ?)",
      [userId, eventId, certificateImageUrl, isPaid]
    );

    res.json({ message: "Cấp chứng chỉ thành công!", certificateImageUrl });
  } catch (err) {
    console.error("Lỗi issueCertificate:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Upload media for an event
 *     description: Allows admin or organizer to upload media (e.g., photos) for an event
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - fileUrl
 *               - fileType
 *             properties:
 *               eventId:
 *                 type: integer
 *               fileUrl:
 *                 type: string
 *               fileType:
 *                 type: string
 *                 enum: [image, video]
 *               caption:
 *                 type: string
 *     responses:
 *       200:
 *         description: Media uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       500:
 *         description: Server error
 */
exports.uploadMedia = async (req, res) => {
  const { eventId, fileUrl, fileType, caption } = req.body;
  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được upload media!" });
  }
  if (
    !eventId ||
    !fileUrl ||
    !fileType ||
    !["image", "video"].includes(fileType)
  ) {
    return res.status(400).json({
      error: "EventId, fileUrl, và fileType (image/video) là bắt buộc!",
    });
  }

  try {
    const mediaDir = path.join(__dirname, "..", "media");
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir);
    }

    const mediaPath = path.join(
      mediaDir,
      `${Date.now()}-${path.basename(fileUrl)}`
    );
    await pool.execute(
      "INSERT INTO Media (EventId, UploaderId, FileUrl, FileType, Caption) VALUES (?, ?, ?, ?, ?)",
      [
        eventId,
        req.user.userId,
        `/media/${path.basename(mediaPath)}`,
        fileType,
        caption || null,
      ]
    );
    res.json({ message: "Upload media thành công!" });
  } catch (err) {
    console.error("Lỗi uploadMedia:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events/{id}/media:
 *   get:
 *     summary: Get media list for an event
 *     description: Returns all media (e.g., photos) for a specific event (for Admin or Organizer)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved media list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 media:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       MediaId:
 *                         type: integer
 *                       EventId:
 *                         type: integer
 *                       FileUrl:
 *                         type: string
 *                       FileType:
 *                         type: string
 *                       Caption:
 *                         type: string
 *       403:
 *         description: Forbidden (not admin or organizer)
 *       404:
 *         description: Event not found or no media
 *       500:
 *         description: Server error
 */
exports.getEventMedia = async (req, res) => {
  const eventId = req.params.id;

  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được xem media!" });
  }

  try {
    const [rows] = await pool.execute("SELECT * FROM Media WHERE EventId = ?", [
      eventId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Không có media cho sự kiện này!" });
    }
    res.json({ media: rows });
  } catch (err) {
    console.error("Lỗi getEventMedia:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete media for an event
 *     description: Allows admin or organizer to delete a specific media item
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Media deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden (not admin or organizer or not uploader)
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
exports.deleteMedia = async (req, res) => {
  const mediaId = req.params.id;

  if (req.user.roleId !== 1 && req.user.roleId !== 2) {
    return res
      .status(403)
      .json({ error: "Chỉ admin hoặc organizer được xóa media!" });
  }

  try {
    const [media] = await pool.execute(
      "SELECT * FROM Media WHERE MediaId = ?",
      [mediaId]
    );
    if (media.length === 0) {
      return res.status(404).json({ error: "Media không tồn tại!" });
    }

    // Kiểm tra quyền: Chỉ uploader (Organizer) hoặc Admin
    const uploaderId = media[0].UploaderId;
    if (req.user.roleId !== 1 && uploaderId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Chỉ uploader hoặc admin được xóa media này!" });
    }

    // Xóa file khỏi hệ thống
    const mediaDir = path.join(__dirname, "..", "media");
    const filePath = path.join(mediaDir, path.basename(media[0].FileUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Xóa record khỏi DB
    await pool.execute("DELETE FROM Media WHERE MediaId = ?", [mediaId]);
    res.json({ message: "Xóa media thành công!" });
  } catch (err) {
    console.error("Lỗi deleteMedia:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get event analytics
 *     description: Returns basic analytics (total registrations, attendees, average feedback rating) for admin
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analytics:
 *                   type: object
 *                   properties:
 *                     totalRegistrations:
 *                       type: integer
 *                     totalAttendees:
 *                       type: integer
 *                     averageRating:
 *                       type: number
 *                     feedbackCount:
 *                       type: integer
 *       403:
 *         description: Forbidden (not admin)
 *       500:
 *         description: Server error
 */
exports.getAnalytics = async (req, res) => {
  if (req.user.roleId !== 1) {
    return res.status(403).json({ error: "Chỉ admin được xem phân tích!" });
  }

  try {
    const [registrationCount] = await pool.execute(
      "SELECT COUNT(*) AS totalRegistrations FROM Registrations WHERE Status = 0"
    );
    const [attendanceCount] = await pool.execute(
      "SELECT COUNT(*) AS totalAttendees FROM Attendances"
    );
    const [feedbackStats] = await pool.execute(
      "SELECT COUNT(*) AS feedbackCount, AVG(Rating) AS averageRating FROM Feedbacks WHERE IsApproved = 1"
    );
    res.json({
      analytics: {
        totalRegistrations: registrationCount[0].totalRegistrations,
        totalAttendees: attendanceCount[0].totalAttendees,
        averageRating: feedbackStats[0].averageRating || 0,
        feedbackCount: feedbackStats[0].feedbackCount,
      },
    });
  } catch (err) {
    console.error("Lỗi getAnalytics:", err);
    res.status(500).json({
      error: "Lỗi server: " + err.message + " - Chi tiết: " + err.sqlMessage,
    });
  }
};

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Register for an event
 *     description: Allows student to register for an approved event, move to waitlist if full
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *             properties:
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Registration successful or added to waitlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 isWaitlist:
 *                   type: boolean
 *       400:
 *         description: Event full or invalid
 *       403:
 *         description: Forbidden (not student)
 *       500:
 *         description: Server error
 */
exports.registerEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.userId;

  if (req.user.roleId !== 3) {
    return res.status(403).json({ error: "Chỉ student được đăng ký!" });
  }
  if (!eventId) {
    return res.status(400).json({ error: "EventId là bắt buộc!" });
  }

  try {
    const [event] = await pool.execute(
      "SELECT MaxParticipants, (SELECT COUNT(*) FROM Registrations r WHERE r.EventId = e.EventId AND r.Status = 0) as Registered FROM Events e WHERE EventId = ? AND Status = 1",
      [eventId]
    );
    if (event.length === 0) {
      return res
        .status(400)
        .json({ error: "Sự kiện không tồn tại hoặc chưa được phê duyệt!" });
    }
    if (
      event[0].MaxParticipants &&
      event[0].Registered >= event[0].MaxParticipants
    ) {
      await pool.execute(
        "INSERT INTO WaitlistEntries (UserId, EventId) VALUES (?, ?)",
        [userId, eventId]
      );
      return res.status(201).json({
        message: "Sự kiện đầy, bạn đã được thêm vào hàng đợi!",
        isWaitlist: true,
      });
    }

    await pool.execute(
      "INSERT INTO Registrations (UserId, EventId, Status) VALUES (?, ?, 0)",
      [userId, eventId]
    );
    res.status(201).json({ message: "Đăng ký thành công!", isWaitlist: false });
  } catch (err) {
    console.error("Lỗi registerEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get list of event categories
 *     description: Retrieves a list of available event categories for creating new events
 *     tags: [Events]
 *     security: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           CategoryId:
 *                             type: integer
 *                           CategoryName:
 *                             type: string
 *                 error:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error
 */
exports.getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute(
      "SELECT CategoryId, CategoryName FROM EventCategories"
    );
    if (!categories || categories.length === 0) {
      return res.json({
        success: true,
        message: "No categories found!",
        data: { categories: [] },
        error: null,
      });
    }
    res.json({
      success: true,
      message: "Categories retrieved successfully!",
      data: { categories },
      error: null,
    });
  } catch (err) {
    console.error("Error getting categories:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories!",
      data: null,
      error: err.message,
    });
  }
};

/**
 * @swagger
 * /venues:
 *   get:
 *     summary: Get list of venues
 *     description: Retrieves a list of available venues for creating new events
 *     tags: [Events]
 *     security: []
 *     responses:
 *       200:
 *         description: Venues retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     venues:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           VenueId:
 *                             type: integer
 *                           VenueName:
 *                             type: string
 *                           Location:
 *                             type: string
 *                           Capacity:
 *                             type: integer
 *                 error:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error
 */
exports.getVenues = async (req, res) => {
  try {
    const [venues] = await pool.execute(
      "SELECT VenueId, VenueName, Location, Capacity FROM Venues"
    );
    if (!venues || venues.length === 0) {
      return res.json({
        success: true,
        message: "No venues found!",
        data: { venues: [] },
        error: null,
      });
    }
    res.json({
      success: true,
      message: "Venues retrieved successfully!",
      data: { venues },
      error: null,
    });
  } catch (err) {
    console.error("Error getting venues:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve venues!",
      data: null,
      error: err.message,
    });
  }
};
