/** @format */

import express from "express";
import { Bikes } from "../models/bikeModel.js";
const router = express.Router();

router.get("/getallbikes", async (req, res) => {
  try {
    const bikes = await Bikes.find();
    res.json(bikes);
  } catch (error) {
    res.json(error);
  }
});

router.post("/addbike", async (req, res) => {
  try {
    const newBike = new Bikes(req.body);
    const bike = await newBike.save();
    res.status(200).json({ msg: "Bike Added successfully" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editbike", async (req, res) => {
  try {
    const bike = await Bikes.findOneAndUpdate({ _id: req.body._id }, req.body);

    res.status(200).json({ msg: "Bike details updated" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletebike", async (req, res) => {
  // const id = req.body._id;
  console.log(req.body);
  try {
    const bike = await Bikes.findOneAndDelete({ _id: req.body.bikeid });
    // console.log(bike);
    res.status(200).json({ msg: "Bike deleted" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export const bikeRouter = router;
