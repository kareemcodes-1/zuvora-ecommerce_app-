import React from "react";
import { getProducts } from "../../actions/getProducts";
import VirtualSwiperClient from "./virtual-swiper-client";

const VirtualSwiper = async () => {
  const products = await getProducts();
  return <VirtualSwiperClient products={products} />;
};

export default VirtualSwiper;