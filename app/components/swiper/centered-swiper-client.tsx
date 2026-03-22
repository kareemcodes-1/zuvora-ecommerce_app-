"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Product } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../products/product-card";

const CenteredSwiperClient = ({ products }: { products: Product[] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperRef, setSwiperRef] = useState<any>(null);

  useEffect(() => {
    if (
      swiperRef?.params?.navigation &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.params.navigation.prevEl = prevRef.current;
      swiperRef.params.navigation.nextEl = nextRef.current;
      swiperRef.navigation.destroy();
      swiperRef.navigation.init();
      swiperRef.navigation.update();
    }
  }, [swiperRef]);

  return (
  <div className="relative w-full max-w-[400px] mx-auto px-[1rem] lg:px-0">
    <Swiper
      modules={[Navigation, Autoplay]}
      onSwiper={setSwiperRef}
      slidesPerView={1}
      speed={1200}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="mySwiper"
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="flex gap-[1rem] lg:gap-[1.5rem] mt-[1.5rem] lg:mt-0 justify-center lg:justify-start lg:absolute lg:z-[200000] lg:bottom-[-4rem] lg:right-[-9rem]">
      <button ref={prevRef} className="btn btn--dark btn--icon-left cursor-pointer" />
      <button ref={nextRef} className="btn btn--dark btn--icon-right cursor-pointer" />
    </div>
  </div>
);
};

export default CenteredSwiperClient;