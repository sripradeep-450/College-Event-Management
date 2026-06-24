const express = require("express");

const router = express.Router();

const {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates,
} = require("../controllers/certificateController");

router.post("/", generateCertificate);
router.get(
  "/verify/:certificateNumber",
  verifyCertificate
);
router.get(
  "/student/:studentId",
  getStudentCertificates
);

module.exports = router;