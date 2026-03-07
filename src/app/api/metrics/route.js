import { getAuthUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import Book from "@/models/books.model";

export async function GET(req) {
  try {
    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const books = await Book.find({ userId: user.userId });

    const stats = {
      total: books.length,
      reading: books.filter((book) => book.status === "reading").length,
      completed: books.filter((book) => book.status === "completed").length,
      wantToRead: books.filter((book) => book.status === "want_to_read").length,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (err) {
    console.error("metrics error", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
