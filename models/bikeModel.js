/** @format */

import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rentPerHour: {
      type: Number,
      required: true,
    },
    milage: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bookedTimeSlots: [
      {
        fromTime: {
          type: String,
          required: true,
        },
        toTime: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Bikes = mongoose.model("Bikes", bikeSchema);
