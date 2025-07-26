const express = require("express");
const {
  registerStudent,
  loginStudent,
  uploadAssignment,
  checkAndGenerateCertificate,
  getStudentStatus, // ✅ Added
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/upload", uploadAssignment);
router.post("/certificate", checkAndGenerateCertificate);
router.get("/:usn", getStudentStatus); // ✅ NEW

module.exports = router;
