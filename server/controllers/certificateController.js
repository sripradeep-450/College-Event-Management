const PDFDocument = require("pdfkit");
const fs = require("fs");

const Certificate = require("../models/Certificate");
const Student = require("../models/Student");
const Event = require("../models/Event");
const QRCode = require("qrcode");
exports.generateCertificate =
  async (req, res) => {
    try {
      const { studentId, eventId } = req.body;

      const existingCertificate =
        await Certificate.findOne({
          studentId,
          eventId,
        });

      if (existingCertificate) {
        return res.status(400).json({
          message:
            "Certificate Already Generated",
        });
      }

      const student =
        await Student.findById(studentId);

      const event =
        await Event.findById(eventId);

      const certificateNumber =
        "CERT-" + Date.now();

      const certificate =
        await Certificate.create({
          studentId,
          eventId,
          certificateNumber,
        });

      const doc = new PDFDocument();

      const filePath =
        `certificates/${certificateNumber}.pdf`;

      doc.pipe(
        fs.createWriteStream(filePath)
      );

      doc.fontSize(24);
      doc.text(
        "Certificate of Participation",
        {
          align: "center",
        }
      );

      doc.moveDown();

      doc.fontSize(18);

      doc.text(
        `This is to certify that ${student.name}`,
        {
          align: "center",
        }
      );

      doc.moveDown();

      doc.text(
        `Participated in ${event.eventName}`,
        {
          align: "center",
        }
      );

      doc.moveDown();

      doc.text(
        `Certificate Number: ${certificateNumber}`,
        {
          align: "center",
        }
      );

      doc.end();
      const qrPath =
        `qrcodes/${certificateNumber}.png`;

      await QRCode.toFile(
        qrPath,
        certificateNumber
      );

      certificate.qrCode = qrPath;

      await certificate.save();

      res.status(201).json({
        message:
          "Certificate Generated Successfully",
        certificate,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

exports.verifyCertificate =
  async (req, res) => {
    try {
      const certificate =
        await Certificate.findOne({
          certificateNumber:
            req.params.certificateNumber,
        })
          .populate("studentId")
          .populate("eventId");

      if (!certificate) {
        return res.status(404).json({
          message:
            "Certificate Not Found",
        });
      }

      res.status(200).json({
        valid: true,
        certificate,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  exports.getStudentCertificates =
  async (req, res) => {

    try {

      const certificates =
        await Certificate.find({
          studentId:
            req.params.studentId,
        })
        .populate("eventId")
        .populate("studentId");

      res.status(200).json(
        certificates
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };