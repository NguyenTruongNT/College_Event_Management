const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Received Authorization header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: "Chưa đăng nhập! Cần token." });
  }

  // Phải đúng chuẩn "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Sai định dạng token! Phải là 'Bearer <token>'" });
  }

  const token = parts[1];
  console.log("Token for verify:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token - roleId:", decoded.roleId); // Log roleId
    req.user = decoded; // Gắn vào request
    next();
  } catch (err) {
    console.error("Token verify error:", err.message);
    res.status(401).json({ error: "Token không hợp lệ hoặc hết hạn!" });
  }
};

const requireRole = (roles) => (req, res, next) => {
  console.log("Required roles:", roles, "User roleId:", req.user.roleId); // Debug
  if (!roles.includes(req.user.roleId)) {
    return res.status(403).json({ error: "Không có quyền truy cập!" });
  }
  next();
};

module.exports = { auth, requireRole };
