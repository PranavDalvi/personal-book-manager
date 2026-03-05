import mongoose from "mongoose";

const { Schema } = mongoose;

const bookModel = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: { type: String, trim: true },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      required: true,
      enum: ["want_to_read", "reading", "completed"],
      default: "want_to_read",
    },
  },
  { timestamps: true },
);

const Book = mongoose.models.Book || mongoose.model("Book", bookModel);
export default Book;
