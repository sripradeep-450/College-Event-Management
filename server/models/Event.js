const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    maxParticipants: {
      type: Number,
      required: true,
    },

    registeredCount: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "Technical",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);