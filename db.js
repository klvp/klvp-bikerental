/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function ConnectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected ✌"))
    .catch((err) => console.log(err));
}

export default ConnectDB;
