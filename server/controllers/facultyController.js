const Student = require("../models/Student");

const getPendingApprovals = async (req, res) => {
  try {
    const { subject } = req.params;
    const students = await Student.find({
      "assignments.subject": subject,
      "assignments.approved": false,
    });

    const filtered = students.map((s) => ({
      name: s.name,
      usn: s.usn,
      file: s.assignments.find(
        (a) => a.subject === subject && !a.approved
      )?.file,
    }));

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending approvals" });
  }
};

const approveAssignment = async (req, res) => {
  try {
    const { usn, subject } = req.body;

    const student = await Student.findOne({ usn });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const assignment = student.assignments.find((a) => a.subject === subject);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    assignment.approved = true;
    await student.save();

    res.json({ message: "Approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

module.exports = { getPendingApprovals, approveAssignment };
