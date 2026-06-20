const express = require("express");

const router = express.Router();

const {
  generateCertificate,
  verifyCertificate,
} = require("../controllers/certificateController");

router.post("/", generateCertificate);
router.get(
  "/verify/:certificateNumber",
  verifyCertificate
);

module.exports = router;