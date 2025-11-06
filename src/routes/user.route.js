import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  cancelRegistration,
  getEventById,
  getEvents,
  login,
  myRegistrations,
  register,
  signup,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/register", auth, register);

userRouter.get("/my-registrations", auth, myRegistrations);
userRouter.get("events", getEvents);
userRouter.get("events/:id", getEventById);

userRouter.delete("/cancel/:id", auth, cancelRegistration);

export { userRouter };
