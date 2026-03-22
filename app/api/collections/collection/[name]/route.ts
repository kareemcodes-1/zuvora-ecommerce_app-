import { NextRequest, NextResponse } from "next/server";
import Collection from "@/models/Collection";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  
  try {
    await dbConnect();
    const collection = await Collection.findOne({ name });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
