const Student = require("../models/Student");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.getDashboardStats = async (
  req,
  res
) => {
  try {

    const role =
      req.query.role;

    // STUDENT DASHBOARD

    if (role === "student") {

      const studentId =
        req.query.studentId;

      const totalEvents =
        await Event.countDocuments();

      const myRegistrations =
        await Registration.countDocuments({
          studentId,
        });

      const registrations =
        await Registration.find({
          studentId,
        }).populate("eventId");

      const today =
        new Date();

      const upcomingEvents =
        registrations
          .filter(
            (reg) =>
              reg.eventId &&
              new Date(
                reg.eventId.date
              ) > today
          )
          .sort(
            (a, b) =>
              new Date(
                a.eventId.date
              ) -
              new Date(
                b.eventId.date
              )
          );

      const upcomingEvent =
        upcomingEvents.length > 0
          ? {
              eventName:
                upcomingEvents[0]
                  .eventId
                  .eventName,
              date:
                upcomingEvents[0]
                  .eventId
                  .date,
            }
          : null;

      return res.status(200).json({
        totalEvents,
        myRegistrations,
        upcomingEvent,
      });
    }

    // ADMIN DASHBOARD

    const totalStudents =
      await Student.countDocuments({
        role: "student",
      });

    const totalEvents =
      await Event.countDocuments();

    const registrations =
      await Registration.find();

    const uniqueStudents =
      new Set(
        registrations.map(
          (reg) =>
            reg.studentId.toString()
        )
      );

    const participatedStudents =
      uniqueStudents.size;

    const today =
      new Date();

    const upcomingEvent =
      await Event.findOne({
        date: {
          $gt: today,
        },
      }).sort({
        date: 1,
      });

    res.status(200).json({
      totalStudents,
      participatedStudents,
      totalEvents,
      upcomingEvent,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};