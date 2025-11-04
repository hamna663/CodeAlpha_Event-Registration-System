import express from "express";
import { connectDB } from "./dbConfig.js";

const app = express();

await connectDB();

app.get("/", (req, res) => {
  console.log("Hello ");
  res.send("Hello");
});

export { app };
