import { NextResponse, NextRequest } from "next/server";
import Product from "@/models/Product"
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
      await dbConnect();
      const products = await Product.find();
      if(!products){
        return new NextResponse(JSON.stringify({ error: 'Data is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
      }else{
        return new NextResponse(JSON.stringify(products), {
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

    const newProduct = await Product.create(body);

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