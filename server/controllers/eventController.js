const Event = require("../models/Event");
const Attendance = require("../models/Attendance");
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      message: "Event Created Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {

    const events =
      await Event.find();

    const updatedEvents =
      events.map((event) => {

        const obj =
          event.toObject();

        obj.remainingSeats =
          obj.maxParticipants -
          obj.registeredCount;

        return obj;
      });

    res.status(200).json(
      updatedEvents
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      message: "Event Updated Successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    res.status(200).json({
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEventsByCategory =
  async (req, res) => {
    try {
      const events =
        await Event.find({
          category: req.params.category,
        });

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

exports.searchEvents =
  async (req, res) => {
    try {
      const keyword =
        req.params.keyword;

      const events =
        await Event.find({
          eventName: {
            $regex: keyword,
            $options: "i",
          },
        });

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  exports.getAttendanceEvents =
  async (req, res) => {

    try {

      const today =
        new Date();

      const thirtyDaysAgo =
        new Date();

      thirtyDaysAgo.setDate(
        today.getDate() - 30
      );

      const events =
        await Event.find({
          date: {
            $gte:
              thirtyDaysAgo,
            $lte:
              today,
          },
        });

      const result =
        await Promise.all(

          events.map(
            async (
              event
            ) => {

              const count =
                await Attendance.countDocuments({
                  eventId:
                    event._id,
                });

              let status =
                "Pending";

              if (
                count > 0
              ) {

                status =
                  "Correction Window";

              }

              return {
                ...event.toObject(),
                attendanceStatus:
                  status,
              };

            }
          )

        );

      res.status(200).json(
        result
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };