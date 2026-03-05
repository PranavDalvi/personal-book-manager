import { getAuthUser } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/books.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const tag = searchParams.get("tag");

    const query = { userId: user.userId };

    if (status) {
      query.status = status;
    }
    if (tag) {
      query.tags = tag;
    }
    const books = await Book.find(query);
    return NextResponse.json(books, { status: 200 });
  } catch (err) {
    console.error("Get book error:", err);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const user = getAuthUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { title, author, tags, status } = await req.json();
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 },
      );
    }
    const book = await Book.create({
      userId: user.userId,
      title,
      author: author || "",
      tags: tags || [],
      status: status || "want_to_read",
    });
    return NextResponse.json(book, { status: 201 });
  } catch (err) {
    console.error("Create book error:", err);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
