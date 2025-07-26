const Student = require("../models/Student");
const multer = require("multer");
const path = require("path");
const generateCertificate = require("../utils/certificate");

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Student Register
exports.registerStudent = async (req, res) => {
  try {
    const { name, usn, password } = req.body;
    const student = await Student.create({ name, usn, password });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Student Login
exports.loginStudent = async (req, res) => {
  const { usn, password } = req.body;
  const student = await Student.findOne({ usn, password });
  if (!student) return res.status(400).json({ message: "Invalid credentials" });
  res.json(student);
};

// ✅ Upload Assignment
exports.uploadAssignment = [
  upload.single("file"),
  async (req, res) => {
    const { usn, subject } = req.body;
    const student = await Student.findOne({ usn });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // ✅ Check if subject already exists → replace the file
    const existing = student.assignments.find((a) => a.subject === subject);
    if (existing) {
      existing.file = req.file.filename;
      existing.approved = false; // reset approval if re-uploaded
    } else {
      student.assignments.push({ subject, file: req.file.filename });
    }

    await student.save();
    res.json({ message: "Uploaded successfully", student });
  },
];

// ✅ Check if all approved → Generate Certificate
exports.checkAndGenerateCertificate = async (req, res) => {
  const { usn } = req.body;
  const student = await Student.findOne({ usn });
  if (!student) return res.status(404).json({ message: "Student not found" });

  const allApproved =
    student.assignments.length === 6 &&
    student.assignments.every((a) => a.approved);

  if (allApproved) {
    const pdfPath = await generateCertificate(student.name, student.usn);
    student.certificateIssued = true;
    await student.save();
    return res.json({ message: "Certificate Generated", pdf: pdfPath });
  }

  res.status(400).json({ message: "Not all subjects approved yet" });
};

// ✅ NEW: Get Student Status (to show uploaded/approved)
exports.getStudentStatus = async (req, res) => {
  try {
    const { usn } = req.params;
    const student = await Student.findOne({ usn });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ assignments: student.assignments });
  } catch (err) {
    res.status(500).json({ message: "Error fetching status" });
  }
};
