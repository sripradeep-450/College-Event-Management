const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendanceByEvent,
  getAttendanceByStudent,
  getRegisteredStudents,
  markAttendanceStatus,
} = require("../controllers/attendanceController");

router.post("/", markAttendance);

router.get(
  "/event/:eventId",
  getAttendanceByEvent
);

router.get(
  "/student/:studentId",
  getAttendanceByStudent
);

router.get(
  "/registered/:eventId",
  getRegisteredStudents
);

router.post(
  "/mark",
  markAttendanceStatus
);

module.exports = router;