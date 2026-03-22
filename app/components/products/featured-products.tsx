import React from "react";
import VirtualSwiper from "../swiper/virtual-swiper";
import gsap from "gsap";
import Link from "next/link";
import FeaturedProductsHeading from "./featured-products-heading";

const FeaturedProducts = () => {
  return (
    <section className="px-[1rem] lg:px-[2rem] py-[3rem] lg:py-[5rem] w-full flex flex-col">
      <div className="flex flex-col flex-1 min-h-0">
        <FeaturedProductsHeading />
        <div className="flex-1 min-h-0 items-center justify-center">
          <VirtualSwiper />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;