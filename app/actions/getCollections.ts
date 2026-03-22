"use server";

import dbConnect from "@/lib/dbConnect";

export async function getCollections() {
  try {
    await dbConnect();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/collections`);
    const data = await res.json();
    return data;
  } catch (error) {
        console.error("Failed to fetch collections:", error);
  }
}

export async function getCollection(name: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/collection/${name}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch collection "${name}":`, error);
  }
}

