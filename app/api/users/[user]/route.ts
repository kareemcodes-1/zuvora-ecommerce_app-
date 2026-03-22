import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, name, email, currentPassword, newPassword } = body;

    if (!_id) {
      return new NextResponse(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Optional password update
    if (newPassword) {
      if (!currentPassword) {
        return new NextResponse(JSON.stringify({ error: "Current password is required to change password" }), {
          status: 400,
        });
      }

      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return new NextResponse(JSON.stringify({ error: "Incorrect current password" }), {
          status: 401,
        });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update name/email if provided
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

