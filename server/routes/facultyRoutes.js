const express = require("express");
const { getPendingApprovals, approveAssignment } = require("../controllers/facultyController");
const router = express.Router();

router.get("/pending/:subject", getPendingApprovals);
router.post("/approve", approveAssignment);

module.exports = router;
