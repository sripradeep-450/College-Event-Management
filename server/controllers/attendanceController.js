const Attendance = require("../models/Attendance");

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