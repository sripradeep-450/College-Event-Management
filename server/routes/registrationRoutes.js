const express = require("express");

const router = express.Router();

const {
  registerForEvent,
  getStudentRegistrations,
} = require("../controllers/registrationController");

router.post("/", registerForEvent);

router.get(
  "/student/:studentId",
  getStudentRegistrations
);

module.exports = router;