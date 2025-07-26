const express = require("express");
const {
  registerStudent,
  loginStudent,
  uploadAssignment,
  checkAndGenerateCertificate,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/upload", uploadAssignment);
router.post("/certificate", checkAndGenerateCertificate);

module.exports = router;
