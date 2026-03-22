import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import dbConnect from "@/lib/dbConnect";
import { Types } from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  const { collectionId } = await params;
  
  try {
    await dbConnect();

    if (!Types.ObjectId.isValid(collectionId)) {
      return NextResponse.json({ error: "Invalid collection ID" }, { status: 400 });
    }

    const products = await Product.find({
      collectionId: new Types.ObjectId(collectionId),
    });

    if (products.length === 0) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}