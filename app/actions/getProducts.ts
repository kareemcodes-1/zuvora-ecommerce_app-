"use server";

export async function getProduct(name: string) {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/product/${name}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


