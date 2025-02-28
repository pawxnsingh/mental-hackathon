import { connectDB } from "@/lib/db";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET() {
//   await connectDB();
  console.log("Connected");

  const users = {
    abcd: "abcd",
  };
  return NextResponse.json(users);
}
