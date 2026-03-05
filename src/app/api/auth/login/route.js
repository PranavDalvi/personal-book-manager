import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist with this email" },
        { status: 401 },
      );
    }

    const isPwdCorrect = await bcrypt.compare(password, user.password);
    if (!isPwdCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 },
    );
  } catch (err) {
    console.error("Backend Login Error: ", err);
    return NextResponse.json({ message: "Login Failed" }, { status: 500 });
  }
}
