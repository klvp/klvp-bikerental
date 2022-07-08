/** @format */

import express from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/userModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const validUser = await Users.findOne({ username: req.body.username });
    if (validUser) {
      return res.json({ msg: "User already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new Users({
      username: req.body.username,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json({ msg: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);
    console.log(user);
    if (!user) {
      res.status(400).json({ msg: "User not registered" });
    } else if (!isValid) {
      res.status(400).json({ msg: "Password Incorect" });
    } else {
      res.status(200).json({ user, msg: "Login Success" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export const userRoutes = router;
