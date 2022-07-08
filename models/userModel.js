/** @format */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    reqired: true,
  },
});

export const Users = mongoose.model("Users", userSchema);
