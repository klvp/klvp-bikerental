/** @format */

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bikes",
    },
    bookedTimeSlots: {
      fromTime: {
        type: String,
      },
      toTime: {
        type: String,
      },
    },

    totalHours: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Bookings = mongoose.model("Bookings", bookingSchema);
