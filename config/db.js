import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.log("Mongoose connection failed".red.bold);
    console.log(e);
  }
}
