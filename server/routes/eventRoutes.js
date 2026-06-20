const express = require("express");

const router = express.Router();
const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  searchEvents,
} = require("../controllers/eventController");

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "organizer"),
  createEvent
);

router.get("/", getEvents);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.get(
  "/category/:category",
  getEventsByCategory
);

router.get(
  "/search/:keyword",
  searchEvents
);
module.exports = router;