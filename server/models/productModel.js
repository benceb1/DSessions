const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Venue",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
