import { getCollection } from "@/app/actions/getCollections";
import { getProductByCollection } from "@/app/actions/getProductByCollection";
import { getCategories } from "@/app/actions/getCategories";
import CollectionProducts from "./collection-products";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const collection = await getCollection(name);

  if (!collection) {
    notFound();
  }

  const products = await getProductByCollection(collection._id.toString());
  const categories = await getCategories();

  return (
    <CollectionProducts
      collection={collection}
      products={products}
      categories={categories}
    />
  );
}