/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./db.js";
import { userRoutes } from "./routes/usersRoute.js";
import { bookingRouter } from "./routes/bookingsRoute.js";
import { bikeRouter } from "./routes/bikesRoute.js";
import path from "path";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

ConnectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRouter);
app.use("/api/bikes", bikeRouter);


app.listen(port, () => console.log(`Node Server listening on port ${port}`));

app.get("/", (req, res) => res.send("Welcome"));
