import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function getRelatedProducts(
  collectionId: string,
  excludeId: string,
  limit: number = 5
) {
  await dbConnect();
  const products = await Product.find({
    collectionId,
    _id: { $ne: excludeId }, // exclude the current product
  })
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(products));
}