const pool = require("../db");

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lấy danh sách sự kiện đã phê duyệt
 *     description: Trả về tất cả sự kiện có trạng thái approved (Status = 1)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
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
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
exports.getEvents = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT e.EventId, e.Title, e.Description, e.StartTime, e.EndTime, e.MaxParticipants, e.Status, v.VenueName, c.CategoryName " +
        "FROM Events e " +
        "LEFT JOIN Venues v ON e.VenueId = v.VenueId " +
        "LEFT JOIN EventCategories c ON e.CategoryId = c.CategoryId " +
        "WHERE e.Status = 1" // Chỉ lấy approved
    );
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
 *     summary: Lấy danh sách sự kiện đang chờ phê duyệt
 *     description: Trả về tất cả sự kiện có trạng thái pending (Status = 0), chỉ cho admin và organizer
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
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
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
exports.getPendingEvents = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT e.EventId, e.Title, e.Description, e.StartTime, e.EndTime, e.MaxParticipants, e.Status, v.VenueName, c.CategoryName " +
        "FROM Events e " +
        "LEFT JOIN Venues v ON e.VenueId = v.VenueId " +
        "LEFT JOIN EventCategories c ON e.CategoryId = c.CategoryId " +
        "WHERE e.Status = 0" // Chỉ lấy pending
    );
    res.json({ pendingEvents: rows }); // Trả mảng sự kiện pending
  } catch (err) {
    console.error("Lỗi getPendingEvents:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Tạo sự kiện mới (chỉ admin hoặc organizer)
 *     description: Tạo sự kiện với trạng thái pending (Status = 0), cần phê duyệt
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
 *         description: Tạo sự kiện thành công, chờ phê duyệt
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
 *         description: Thiếu thông tin bắt buộc
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
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

  try {
    const [result] = await pool.execute(
      "INSERT INTO Events (Title, Description, StartTime, EndTime, MaxParticipants, Status, OrganizerId, CategoryId, VenueId) " +
        "VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)", // Status=0 (pending)
      [
        title,
        description,
        startTime,
        endTime,
        maxParticipants,
        organizerId,
        categoryId,
        venueId,
      ]
    );
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
 *     summary: Phê duyệt sự kiện (chỉ admin)
 *     description: Cập nhật trạng thái sự kiện từ pending (0) thành approved (1)
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
 *         description: Phê duyệt thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Sự kiện không tồn tại
 *       500:
 *         description: Lỗi server
 */
exports.approveEvent = async (req, res) => {
  const eventId = req.params.id;

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

    await pool.execute(
      "UPDATE Events SET Status = 1, ApproverId = ? WHERE EventId = ?",
      [req.user.userId, eventId]
    );
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
 *     summary: Cập nhật sự kiện (chỉ admin hoặc organizer)
 *     description: Chỉ organizer của sự kiện hoặc admin được phép cập nhật
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
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Sự kiện không tồn tại
 *       500:
 *         description: Lỗi server
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

    await pool.execute(
      "UPDATE Events SET Title = ?, Description = ?, StartTime = ?, EndTime = ?, MaxParticipants = ?, CategoryId = ?, VenueId = ? WHERE EventId = ?",
      [
        title,
        description,
        startTime,
        endTime,
        maxParticipants,
        categoryId,
        venueId,
        eventId,
      ]
    );
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
 *     summary: Xóa sự kiện (chỉ admin)
 *     description: Xóa sự kiện khỏi hệ thống
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
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Không có quyền truy cập
 *       404:
 *         description: Sự kiện không tồn tại
 *       500:
 *         description: Lỗi server
 */
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;

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

    await pool.execute("DELETE FROM Events WHERE EventId = ?", [eventId]);
    res.json({ message: "Xóa sự kiện thành công!" });
  } catch (err) {
    console.error("Lỗi deleteEvent:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};
