import mongoose from "mongoose";

export const connectDB = async () => {
  const connect = await mongoose.connect(
    process.env.MONGODB_URI as string
  );
  if (connect) {
    console.log("Connected to Database");
    return;
  } else {
    console.log("Failed to connect to database");
    return;
  }
};
