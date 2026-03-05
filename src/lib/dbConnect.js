import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("DB connection failed", err);
    process.exit(1);
  }
}

export default dbConnect;
