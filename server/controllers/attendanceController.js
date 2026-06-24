const Attendance = require("../models/Attendance");
const Registration = require("../models/Registration");
const Certificate = require("../models/Certificate");
const Student = require("../models/Student");
const Event = require("../models/Event");
const PDFDocument = require("pdfkit");
const fs = require("fs");
exports.markAttendance = async (
  req,
  res
) => {
  try {
    const { studentId, eventId } = req.body;

    const existingAttendance =
      await Attendance.findOne({
        studentId,
        eventId,
      });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance Already Marked",
      });
    }

    const attendance =
      await Attendance.create({
        studentId,
        eventId,
      });

    res.status(201).json({
      message: "Attendance Marked Successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAttendanceByEvent =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find({
          eventId: req.params.eventId,
        })
          .populate("studentId")
          .populate("eventId");

      res.status(200).json(attendance);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  exports.getAttendanceByStudent =
    async (req, res) => {

      try {

        const attendance =
          await Attendance.find({
            studentId:
              req.params.studentId,
          })
            .populate("eventId");

        res.status(200).json(
          attendance
        );

      } catch (error) {

        res.status(500).json({
          message:
            error.message,
        });

      }

    };
  exports.getRegisteredStudents =
  async (req, res) => {

    try {

      const registrations =
        await Registration.find({
          eventId:
            req.params.eventId,
        })
          .populate(
            "studentId"
          );

      res.status(200).json(
        registrations
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  exports.markAttendanceStatus =
  async (req, res) => {

    try {

      const {
        studentId,
        eventId,
        status,
      } = req.body;

      let attendance =
        await Attendance.findOne({
          studentId,
          eventId,
        });

      if (
        attendance
      ) {

        attendance.status =
          status;

        await attendance.save();

      } else {

        attendance =
          await Attendance.create({
            studentId,
            eventId,
            status,
          });

      }
      if (
        status === "Present"
      ) {

        const existingCertificate =
          await Certificate.findOne({
            studentId,
            eventId,
          });

        if (
          !existingCertificate
        ) {

          const certificateNumber =
            "CERT-" +
            Date.now() +
            "-" +
            studentId
              .toString()
              .slice(-4);

          const certificate =
            await Certificate.create({
              studentId,
              eventId,
              certificateNumber,
            });

          const student =
            await Student.findById(
              studentId
            );

          const event =
            await Event.findById(
              eventId
            );

          const pdfPath =
            `certificates/${certificateNumber}.pdf`;

          const doc =
            new PDFDocument();

          doc.pipe(
            fs.createWriteStream(
              pdfPath
            )
          );

          doc.fontSize(24);

          doc.text(
            "Certificate of Participation",
            {
              align:"center",
            }
          );

          doc.moveDown();

          doc.fontSize(18);

          doc.text(
            `This certifies that ${student.name}`,
            {
              align:"center",
            }
          );

          doc.moveDown();

          doc.text(
            `Participated in ${event.eventName}`,
            {
              align:"center",
            }
          );

          doc.end();

          certificate.pdfPath =
            pdfPath;

          await certificate.save();

        }

      }

      res.status(200).json({
        message:
          "Attendance Saved",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };