const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Received token from header:", token);

  if (!token) {
    return res.status(401).json({ error: "Chưa đăng nhập! Cần token." });
  }

  try {
    const cleanToken = token.replace("Bearer ", "");
    console.log("Cleaned token for verify:", cleanToken);
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    console.log("Decoded token - roleId:", decoded.roleId); // Log roleId
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verify error:", err.message);
    res.status(401).json({ error: "Token không hợp lệ!" });
  }
};

const requireRole = (roles) => (req, res, next) => {
  console.log("Required roles:", roles, "User roleId:", req.user.roleId); // Log debug
  if (!roles.includes(req.user.roleId)) {
    return res.status(403).json({ error: "Không có quyền truy cập!" });
  }
  next();
};

module.exports = { auth, requireRole };
