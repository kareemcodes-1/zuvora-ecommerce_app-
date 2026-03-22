"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getOrders() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return [];

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
      headers: {
        "x-user-id": (session.user as any).id,
      },
      cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("getOrders error:", error);
    return [];
  }
}