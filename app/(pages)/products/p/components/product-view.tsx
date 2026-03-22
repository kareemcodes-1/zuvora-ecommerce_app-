"use client";
import React, { useState } from "react";
import { Product } from "../../../../../../types/index";
import { Minus, Plus } from "lucide-react";
import useCart from "@/store";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { priceFormatter } from "@/lib/priceFormatter";
import ProductCard from "@/app/components/products/product-card";

const ProductView = ({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0]);
  const [activeImage, setActiveImage] = useState(0);

  



  return (
    <section className="relative min-h-screen mt-[5.5rem]">

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen lg:items-start">

        {/* LEFT — Images Column */}
        <div className="lg:w-[55%] w-full">
          {/* Main large image */}
          <div className="relative w-full lg:h-screen h-[70vw] bg-gray-200 overflow-hidden">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              quality={75}
              className="object-contain object-center"
            />
          </div>


          {product.images.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative w-full lg:h-screen h-[70vw] bg-gray-200 overflow-hidden mt-[.5rem]"
            >
              <Image src={img} alt={product.name} fill quality={100} className="object-contain object-center" />
            </div>
          ))}
        </div>

        {/* RIGHT — Sticky Info Panel */}
        <div className="lg:w-[45%] w-full lg:self-start lg:sticky lg:top-0">
          <div className="h-screen overflow-y-auto flex flex-col justify-center px-[3rem] lg:px-[4rem] py-[4rem]">

            {/* Tags */}
            <div className="flex items-center gap-[.5rem] mb-[1.5rem]">
              <span className="text-[.7rem] uppercase tracking-[.15em] border-black/20 text-black border px-[.75rem] py-[.25rem] rounded-full font-[300]">
                In Stock
              </span>
              <span className="text-[.7rem] uppercase tracking-[.15em] border-black/20  text-black border  px-[.75rem] py-[.25rem] rounded-full font-[300]">
                Free Shipping
              </span>
            </div>

            {/* Name & Price */}
            <div>
              <h1 className="text-[2.2rem] lg:text-[2.8rem] telegraf font-[200] uppercase leading-[1.1] mb-[.75rem]">
              {product.name}
            </h1>
            <div className="w-full h-[1px] bg-black/10 mb-[1.5rem]" />
            <p className="text-[1.8rem] telegraf font-[200] mb-[2rem]">
              {priceFormatter(product.price)}
            </p>
            </div>

            {/* Size selector */}
            <div className="mb-[1.5rem]">
              <p className="text-[.75rem] uppercase tracking-[.2em] font-[400] mb-[.75rem] text-black/60">Size</p>
              <div className="flex flex-wrap items-center gap-[.5rem]">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-transparent text-black border-black/20 hover:border-black"
                    } telegraf font-[200] border transition-all duration-200 min-w-[2.5rem] h-[2.5rem] rounded-[5rem] px-[.75rem] py-[.25rem] text-[.9rem] uppercase tracking-[.05em]`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-stretch gap-[.75rem] mb-[1rem]">
              {/* Quantity */}
              <div className="flex items-center gap-[1rem] border border-black/20 px-[1rem] h-[3.5rem] rounded-[5rem] min-w-[8rem] justify-between">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} />
                </button>
                <span className="text-[1rem] telegraf font-[200]">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

              <div>
                <button
                onClick={() => addItem({ item: product, quantity, selectedSize })}
                className="btn btn--filled-dark btn--icon-right !w-full !text-[1.5rem] !text-start mt-[1rem] !mb-[2rem]"
              >
                Add to cart
              </button>
              </div>

            {/* Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="description" className="border-black/10">
                <AccordionTrigger className="text-[0.85rem] lg:text-[1rem] text-[#111] uppercase tracking-[.2em] font-[400] py-[1rem]">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-[0.8rem] lg:text-[0.95rem] font-[300] text-[#555] leading-relaxed telegraf">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-black/10">
                <AccordionTrigger className="text-[0.85rem] lg:text-[1rem] text-[#111] uppercase tracking-[.2em] font-[400] py-[1rem]">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-[0.8rem] lg:text-[0.95rem] font-[300] text-[#555] leading-relaxed telegraf">
                  Free shipping on all orders. Returns accepted within 30 days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sizing" className="border-black/10">
                <AccordionTrigger className="text-[0.85rem] lg:text-[1rem] text-[#111] uppercase tracking-[.2em] font-[400]">
                  Size Guide
                </AccordionTrigger>
                <AccordionContent className="text-[0.8rem] lg:text-[0.95rem] font-[300] text-[#555] leading-relaxed telegraf">
                  Fits true to size. We recommend sizing up if between sizes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <div className="px-[2rem] py-[5rem] border-t border-black/10">
          <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[5.5rem] font-extralight leading-[1.1] mb-[4rem]">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {relatedProducts.map((p, index) => (
              <ProductCard product={p} key={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductView;

export const dynamic = "force-dynamic";