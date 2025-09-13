const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Đăng ký user mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               departmentId:
 *                 type: integer
 *               enrollmentNo:
 *                 type: string
 *               roleId:
 *                 type: integer
 *                 default: 3
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi input
 */
exports.register = async (req, res) => {
  const {
    email,
    password,
    fullName,
    departmentId,
    enrollmentNo,
    roleId = 3,
  } = req.body;
  if (roleId === 3 && !enrollmentNo)
    return res
      .status(400)
      .json({ error: "EnrollmentNo bắt buộc cho student!" });

  try {
    const [existing] = await pool.execute(
      "SELECT * FROM Users WHERE Email = ?",
      [email]
    );
    if (existing.length > 0)
      return res.status(400).json({ error: "Email đã tồn tại!" });

    const hashedPass = await bcrypt.hash(password, 10);
    const [userResult] = await pool.execute(
      "INSERT INTO Users (Email, PasswordHash, RoleId) VALUES (?, ?, ?)",
      [email, hashedPass, roleId]
    );
    const userId = userResult.insertId;
    await pool.execute(
      "INSERT INTO UserProfiles (UserId, FullName, DepartmentId, EnrollmentNo) VALUES (?, ?, ?, ?)",
      [userId, fullName, departmentId, enrollmentNo || null]
    );
    res.status(201).json({ message: "Đăng ký thành công!", userId });
  } catch (err) {
    console.error("Lỗi register:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Lỗi input
 */
exports.login = async (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email và password là bắt buộc!" });

  try {
    const [rows] = await pool.execute("SELECT * FROM Users WHERE Email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ error: "Email không tồn tại!" });
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) return res.status(400).json({ error: "Mật khẩu sai!" });

    const token = jwt.sign(
      { userId: user.UserId, roleId: user.RoleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generated token:", token);
    res.json({ message: "Đăng nhập thành công!", token });
  } catch (err) {
    console.error("Lỗi login:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Lấy thông tin profile user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy profile thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   properties:
 *                     Email:
 *                       type: string
 *                     RoleId:
 *                       type: integer
 *                     FullName:
 *                       type: string
 *                     EnrollmentNo:
 *                       type: string
 *                     DepartmentId:
 *                       type: integer
 *       401:
 *         description: Chưa đăng nhập
 *       404:
 *         description: User không tồn tại
 */
exports.getProfile = async (req, res) => {
  const userId = req.user.userId;
  console.log("Fetching profile for userId:", userId);

  try {
    const [rows] = await pool.execute(
      `
            SELECT u.Email, u.RoleId, up.FullName, up.EnrollmentNo, up.DepartmentId 
            FROM Users u 
            LEFT JOIN UserProfiles up ON u.UserId = up.UserId 
            WHERE u.UserId = ?
        `,
      [userId]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User không tồn tại!" });
    res.json({ profile: rows[0] });
  } catch (err) {
    console.error("Lỗi getProfile:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng (chỉ admin)
 *     tags: [Users]
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
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       UserId:
 *                         type: integer
 *                       Email:
 *                         type: string
 *                       RoleId:
 *                         type: integer
 *                       FullName:
 *                         type: string
 *                       EnrollmentNo:
 *                         type: string
 *                       DepartmentId:
 *                         type: integer
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
exports.getUsers = async (req, res) => {
  if (req.user.roleId !== 1) {
    return res.status(403).json({ error: "Chỉ admin được xem danh sách!" });
  }

  try {
    const [rows] = await pool.execute(`
            SELECT u.UserId, u.Email, u.RoleId, up.FullName, up.EnrollmentNo, up.DepartmentId 
            FROM Users u 
            LEFT JOIN UserProfiles up ON u.UserId = up.UserId
        `);
    res.json({ users: rows });
  } catch (err) {
    console.error("Lỗi getUsers:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Nâng cấp quyền người dùng (chỉ admin)
 *     tags: [Users]
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
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Nâng cấp quyền thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User không tồn tại hoặc roleId không hợp lệ
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
exports.updateUserRole = async (req, res) => {
  const userId = req.params.id;
  const { roleId } = req.body;

  if (req.user.roleId !== 1) {
    return res.status(403).json({ error: "Chỉ admin được nâng cấp quyền!" });
  }
  if (![1, 2, 3].includes(roleId)) {
    return res.status(400).json({ error: "RoleId phải là 1, 2, hoặc 3!" });
  }

  try {
    const [user] = await pool.execute("SELECT * FROM Users WHERE UserId = ?", [
      userId,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ error: "User không tồn tại!" });
    }

    await pool.execute("UPDATE Users SET RoleId = ? WHERE UserId = ?", [
      roleId,
      userId,
    ]);
    res.json({ message: "Nâng cấp quyền thành công!" });
  } catch (err) {
    console.error("Lỗi updateUserRole:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng (chỉ admin)
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               fullName:
 *                 type: string
 *               departmentId:
 *                 type: integer
 *               enrollmentNo:
 *                 type: string
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
 *       400:
 *         description: User không tồn tại
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, fullName, departmentId, enrollmentNo } = req.body;

  if (req.user.roleId !== 1) {
    return res.status(403).json({ error: "Chỉ admin được sửa thông tin!" });
  }

  try {
    const [user] = await pool.execute("SELECT * FROM Users WHERE UserId = ?", [
      userId,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ error: "User không tồn tại!" });
    }

    await pool.execute(
      "UPDATE Users u JOIN UserProfiles up ON u.UserId = up.UserId SET u.Email = ?, up.FullName = ?, up.DepartmentId = ?, up.EnrollmentNo = ? WHERE u.UserId = ?",
      [
        email || user[0].Email,
        fullName || user[0].FullName,
        departmentId || user[0].DepartmentId,
        enrollmentNo || user[0].EnrollmentNo,
        userId,
      ]
    );
    res.json({ message: "Cập nhật thông tin người dùng thành công!" });
  } catch (err) {
    console.error("Lỗi updateUser:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Xóa người dùng (chỉ admin)
 *     tags: [Users]
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
 *         description: User không tồn tại
 *       500:
 *         description: Lỗi server
 */
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  if (req.user.roleId !== 1) {
    return res.status(403).json({ error: "Chỉ admin được xóa người dùng!" });
  }

  try {
    const [user] = await pool.execute("SELECT * FROM Users WHERE UserId = ?", [
      userId,
    ]);
    if (user.length === 0) {
      return res.status(404).json({ error: "User không tồn tại!" });
    }

    await pool.execute("DELETE FROM UserProfiles WHERE UserId = ?", [userId]);
    await pool.execute("DELETE FROM Users WHERE UserId = ?", [userId]);
    res.json({ message: "Xóa người dùng thành công!" });
  } catch (err) {
    console.error("Lỗi deleteUser:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};
