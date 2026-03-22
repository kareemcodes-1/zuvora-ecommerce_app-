import Image from "next/image";
import React from "react";
import { Product } from "@/types";
import { Link } from "lucide-react";
import { priceFormatter } from "@/lib/priceFormatter";


const ProductCard = ({product}: {product: Product}) => {
  return (
    <a href={`/products/p/${product?.name.replace(/\s+/g, '-')}`} className="flex flex-col">
      <div className="bg-[#f0f0f0] h-[18rem] md:h-[25rem] lg:h-[32rem] w-full rounded-[1.5rem] lg:rounded-[calc(3.90625vw)] overflow-hidden">
        <Image
          width={500}
          height={500}
          quality={75}
          src={product.images[0]}
          alt={product?.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-[0.75rem] lg:mt-[1rem]">
        <h3 className="font-[200] uppercase text-[0.8rem] lg:text-[.9rem]">
          {product.name}
        </h3>
        <span>
          <em className="font-[200] uppercase text-[0.8rem] lg:text-[.9rem]">
            {priceFormatter(product.price)}
          </em>
        </span>
      </div>
    </a>
  );
};

export default ProductCard