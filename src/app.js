import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { userRouter } from "./routes/user.route.js";
import { connectDB } from "./dbConfig.js";
import "dotenv/config";

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

app.get("/", (req, res) => {
  console.log("Hello ");
  res.send("Hello");
});

export { app };
