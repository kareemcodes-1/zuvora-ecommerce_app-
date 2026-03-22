import React from "react";
import { getProducts } from "../../actions/getProducts";
import CenteredSwiperClient from "./centered-swiper-client";

const CenteredSwiper = async () => {
  const products = await getProducts();
  return <CenteredSwiperClient products={products} />;
};

export default CenteredSwiper;