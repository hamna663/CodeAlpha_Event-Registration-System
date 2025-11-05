import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup");
userRouter.post("/login");
userRouter.post("/register", auth);

userRouter.get("/my-registrations", auth);
userRouter.get("events");
userRouter.get("events/:id");

userRouter.delete("/cancel/:id", auth);

export { userRouter };
