import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (!connect) console.log("Cannot Connect now!");
    console.log("DB connected!");
  } catch {
    process.exit(1);
  }
};

export { connectDB };
