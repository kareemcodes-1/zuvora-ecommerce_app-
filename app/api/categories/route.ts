import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/Category";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
) {
  try {
    await dbConnect();


    const categories = await Category.find();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}