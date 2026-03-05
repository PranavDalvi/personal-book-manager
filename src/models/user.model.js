import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userModel);
export default User;
