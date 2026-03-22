import { NextResponse, NextRequest } from "next/server";
import Collection from "@/models/Collection"
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
      await dbConnect();
      const collections = await Collection.find();
      if(!collections){
        return new NextResponse(JSON.stringify({ error: 'Data is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
      }else{
        return new NextResponse(JSON.stringify(collections), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      }
  } catch (error) {
    console.log(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const newProduct = await Collection.create(body);

    return new NextResponse(JSON.stringify(newProduct), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}