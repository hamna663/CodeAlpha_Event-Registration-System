import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/user.route.js";
import { adminRouter } from "./routes/admin.route.js";
import { connectDB } from "./dbConfig.js";
// import "dotenv/config";

const app = express();
try {
  await connectDB();
} catch (err) {
  console.log(err);
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Event Management System");
});

export { app };
