import mongoose from "mongoose";
import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: ["registered", "cancelled"],
    default: "registered",
  },
},{
    timestamps:true
});

export const Registration = mongoose.model("Registration", registrationSchema);
