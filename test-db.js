const pool = require("./db.js");

(async () => {
  try {
    const [rows] = await pool.execute("SELECT * FROM Roles");
    console.log("Data from Roles:", rows);
  } catch (err) {
    console.error("Lỗi connect DB:", err.message);
  } finally {
    process.exit();
  }
})();
