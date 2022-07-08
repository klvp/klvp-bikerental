/** @format */

import express from "express";
import { Bookings } from "../models/bookingModel.js";
import { Bikes } from "../models/bikeModel.js";
import { v4 as uuidv4 } from "uuid";
import open from "open";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/bookbike", async (req, res) => {
  const { token } = req.body;
  try {
    // stripe integration in backend
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.paymentIntents.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "INR",
        payment_method_types: ["card"],
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    const paymentIntent = await stripe.paymentIntents.confirm(payment.id, {
      payment_method: "pm_card_visa",
    });
    generateResponse(paymentIntent);
    if (paymentIntent) {
      req.body.transactionId = payment.id;
      const newbooking = new Bookings(req.body);
      await newbooking.save();
      const bike = await Bikes.findOne({
        _id: req.body.bike.toString(),
      });
      bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await bike.save();
      await open(paymentIntent.next_action.use_stripe_sdk.stripe_js);
      res.json({ msg: "Booking Successfull" });
    } else {
      console.log("error");
      return res.json("error happened");
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

router.get("/getbookings", async (req, res) => {
  try {
    const bookings = await Bookings.find().populate("bike");
    res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export const bookingRouter = router;

const generateResponse = (intent) => {
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === "requires_action" &&
    intent.next_action.type === "use_stripe_sdk"
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    };
  } else if (intent.status === "succeeded") {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    return {
      success: true,
    };
  } else {
    // Invalid status
    return {
      error: "Invalid PaymentIntent status",
    };
  }
};
