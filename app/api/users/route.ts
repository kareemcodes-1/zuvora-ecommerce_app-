import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User"

export async function GET(request: NextRequest) {
  try {
      const users = await User.find();
      if(!users){
        return new NextResponse(JSON.stringify({ error: 'Data is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
      }else{
        return new NextResponse(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      }
  } catch (error) {
    console.log(error)
  }
}
 