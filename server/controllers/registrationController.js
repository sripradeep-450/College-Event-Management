const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerForEvent = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;

    const existingRegistration =
      await Registration.findOne({
        studentId,
        eventId,
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already Registered",
      });
    }

    const registration =
      await Registration.create({
        studentId,
        eventId,
      });

    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: 1 },
    });

    res.status(201).json({
      message: "Event Registration Successful",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStudentRegistrations = async (
  req,
  res
) => {
  try {
    const { studentId } = req.params;

    const registrations =
      await Registration.find({
        studentId,
      })
        .populate("eventId")
        .populate("studentId");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};