const pool = require("../db"); // Import DB pool

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
 *     description: Creates a new event with pending status (Status = 0) requiring approval
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
 *     responses:
 *       201:
 *         description: Event created successfully, awaiting approval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 eventId:
 *                   type: integer
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
  } = req.body;
  const organizerId = req.user.userId;

  if (!title || !startTime || !endTime || !categoryId || !venueId) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc!" });
  }

  const createEventQuery = `
        INSERT INTO Events (Title, Description, StartTime, EndTime, MaxParticipants, Status, OrganizerId, CategoryId, VenueId) 
        VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)
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
 * /events/{id}/registrations:
 *   get:
 *     summary: Get list of registered participants for an event
 *     description: Returns list of students registered (Status = 0) for a specific event
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
 *         description: Successfully retrieved list of registrations
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
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Event not found or no registrations
 *       500:
 *         description: Server error
 */
exports.getEventRegistrations = async (req, res) => {
  const eventId = req.params.id;

  const getEventRegistrationsQuery = `
        SELECT r.UserId, r.EventId, up.FullName, up.EnrollmentNo 
        FROM Registrations r 
        LEFT JOIN UserProfiles up ON r.UserId = up.UserId 
        WHERE r.EventId = ? AND r.Status = 0
    `;
  try {
    const [rows] = await pool.execute(getEventRegistrationsQuery, [eventId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Sự kiện không tồn tại hoặc không có đăng ký!" });
    }
    res.json({ registrations: rows });
  } catch (err) {
    console.error("Lỗi getEventRegistrations:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};
