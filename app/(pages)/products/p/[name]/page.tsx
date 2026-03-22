import { getProduct } from "@/app/actions/getProducts";
import ProductView from "../components/product-view";
import { getRelatedProducts } from "@/app/actions/getRelatedProducts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name.replace(/-/g, " "));
  const product = await getProduct(decodedName);
  const relatedProducts = await getRelatedProducts(product.collectionId, product._id, 5);

  return <ProductView product={product} relatedProducts={relatedProducts} />;
}