import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { Types } from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userId = req.headers.get("x-user-id");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ userId: new Types.ObjectId(userId) })
      .populate("products.productId", "name price images")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}