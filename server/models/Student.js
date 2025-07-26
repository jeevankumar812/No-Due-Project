const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignments: [
    {
      subject: String,
      file: String,
      approved: { type: Boolean, default: false },
    },
  ],
  certificateIssued: { type: Boolean, default: false },
});

module.exports = mongoose.model("Student", studentSchema);
