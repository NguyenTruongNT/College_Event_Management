const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
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
 *         description: Registration successful
 *       400:
 *         description: Invalid input
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
      .json({ error: "EnrollmentNo is required for student!" });

  try {
    const [existing] = await pool.execute(
      "SELECT * FROM Users WHERE Email = ?",
      [email]
    );
    if (existing.length > 0)
      return res.status(400).json({ error: "Email already exists!" });

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
    res.status(201).json({ message: "Registration successful!", userId });
  } catch (err) {
    console.error("Lỗi register:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
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
 *         description: Login successful
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
 *         description: Invalid input
 */
exports.login = async (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required!" });

  try {
    const [rows] = await pool.execute("SELECT * FROM Users WHERE Email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ error: "Email does not exist!" });
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password!" });

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
 *     summary: Get user profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
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
 *         description: Unauthorized
 *       404:
 *         description: User not found
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
 *     summary: Get list of all users (only admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user list
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
 *         description: Forbidden
 *       500:
 *         description: Server error
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
 *     summary: Update user role (only admin)
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
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User not found or invalid roleId
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
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
 *     summary: Update user information (only admin)
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
 *         description: Update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User not found
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
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
 *     summary: Delete a user (only admin)
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
 *         description: Delete successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
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

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile information
 *     description: Allows user to update their own profile information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               departmentId:
 *                 type: integer
 *               enrollmentNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *         description: Forbidden (not authorized user)
 *       500:
 *         description: Server error
 */
exports.updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { fullName, departmentId, enrollmentNo } = req.body;

  try {
    const [user] = await pool.execute("SELECT * FROM Users WHERE UserId = ?", [
      userId,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ error: "User không tồn tại!" });
    }

    await pool.execute(
      "UPDATE UserProfiles SET FullName = ?, DepartmentId = ?, EnrollmentNo = ? WHERE UserId = ?",
      [
        fullName || user[0].FullName,
        departmentId || user[0].DepartmentId,
        enrollmentNo || user[0].EnrollmentNo,
        userId,
      ]
    );
    res.json({ message: "Cập nhật thông tin người dùng thành công!" });
  } catch (err) {
    console.error("Lỗi updateUserProfile:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};

/**
 * @swagger
 * /profile/password:
 *   put:
 *     summary: Change user password
 *     description: Allows user to change their password with old password verification
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input or incorrect old password
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
exports.changePassword = async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Old password and new password are required!" });
  }

  try {
    const [user] = await pool.execute(
      "SELECT PasswordHash FROM Users WHERE UserId = ?",
      [userId]
    );
    if (user.length === 0) {
      return res.status(400).json({ error: "User không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user[0].PasswordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Mật khẩu cũ không đúng!" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute("UPDATE Users SET PasswordHash = ? WHERE UserId = ?", [
      newHashedPassword,
      userId,
    ]);
    res.json({ message: "Đổi mật khẩu thành công!" });
  } catch (err) {
    console.error("Lỗi changePassword:", err);
    res.status(500).json({ error: "Lỗi server: " + err.message });
  }
};
