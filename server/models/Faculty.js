const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  subject: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Faculty", facultySchema);
