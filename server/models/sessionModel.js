const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Venue",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    code: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },
    totalPrice: {
      type: Number,
    },
    closed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);
