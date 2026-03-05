import { getAuthUser } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/books.model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const updates = await req.json();

    const book = await Book.findOneAndUpdate(
      { _id: id, userId: user.userId },
      updates,
      { returnDocument: "after" },
    );

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error("PATCH book error:", err);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const book = await Book.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.error("DELETE book error:", err);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
