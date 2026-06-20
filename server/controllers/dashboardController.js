const Student = require("../models/Student");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalStudents =
      await Student.countDocuments({role: "student"});

    const totalEvents =
      await Event.countDocuments();

    const totalRegistrations =
      await Registration.countDocuments();

    res.status(200).json({
      totalStudents,
      totalEvents,
      totalRegistrations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};