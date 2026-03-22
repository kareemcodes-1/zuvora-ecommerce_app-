"use server";

export async function getProductByCollection(collectionId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/collection/${collectionId}`,
      { cache: "no-store" } // or { next: { revalidate: 60 } } if you want ISR
    );

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getProductByCollection error:", error);
    return [];
  }
}