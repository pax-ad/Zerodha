const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    product: {
      type: String,
      default: "CNC", // Cash & Carry (delivery) or MIS (intraday)
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Stock name is required"],
      trim: true,
    },
    qty: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    avg: {
      type: Number,
      required: [true, "Average price is required"],
      min: [0, "Average price cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Current price is required"],
      min: [0, "Current price cannot be negative"],
    },
    net: {
      type: String,
      default: "+0.00%",
    },
    day: {
      type: String,
      default: "+0.00%",
    },
    isLoss: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = { PositionsSchema };