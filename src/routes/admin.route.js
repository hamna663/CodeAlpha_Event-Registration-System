import { Router } from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/admin.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.post("/event", auth, createEvent);
adminRouter.put("/events/:id", auth, updateEvent);
adminRouter.delete("/events/:id", auth, deleteEvent);

export { adminRouter };
