"use server";

export async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
}