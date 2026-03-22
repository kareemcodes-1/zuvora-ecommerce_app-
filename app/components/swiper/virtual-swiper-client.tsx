"use client";
import React, { useRef, useState, useEffect } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "../../components/products/product-card";

export default function VirtualSwiperClient({ products }: { products: Product[] }) {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (swiperRef?.params?.navigation && prevRef.current && nextRef.current) {
      swiperRef.params.navigation.prevEl = prevRef.current;
      swiperRef.params.navigation.nextEl = nextRef.current;
      swiperRef.navigation.destroy();
      swiperRef.navigation.init();
      swiperRef.navigation.update();
    }
  }, [swiperRef]);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      onSwiper={setSwiperRef}
      slidesPerView={3}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      centeredSlides={true}
      spaceBetween={10}
      speed={900}
      loop={true}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      breakpoints={{
        0: { slidesPerView: 1, centeredSlides: false },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3, centeredSlides: true },
      }}
      className="!h-full w-full virtual-swiper"
    >
      {products.slice(0, 5).map((product, index) => (
        <SwiperSlide key={index} virtualIndex={index} className="!h-full">
          <ProductCard product={product}  />
        </SwiperSlide>
      ))}

      <div className="lg:absolute z-[200000] lg:top-[0] right-10">
        <div className="flex gap-[1.5rem] items-center justify-center mt-[1.5rem] lg:mt-0">
          <button ref={prevRef} className="btn btn--dark btn--icon-left cursor-pointer" />
          <button ref={nextRef} className="btn btn--dark btn--icon-right cursor-pointer" />
        </div>
      </div>

      {/* <div className="flex gap-[1rem] lg:gap-[1.5rem] mt-[1.5rem] lg:mt-0 justify-center lg:justify-start lg:absolute lg:z-[200000] lg:bottom-[-4rem] lg:right-[-9rem]">
      <button ref={prevRef} className="btn btn--dark btn--icon-left cursor-pointer" />
      <button ref={nextRef} className="btn btn--dark btn--icon-right cursor-pointer" />
    </div> */}
    </Swiper>
  );
}