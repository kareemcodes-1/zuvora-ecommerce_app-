// "use client";
// import { useEffect } from "react";
import About from "../../components/about";
import Collections from "../../components/collections/collections";
import Hero from "../../components/hero";
import Testimonials from "../../components/testimonials";
import LenisProvider from "../../providers/lenis-provider";
import BestSellers from "../../components/best-sellers/best-sellers";
import FeaturedProducts from "@/app/components/products/featured-products";




export default function Home() {


  return (
    <LenisProvider>

      <Hero />

      <About />
     

    </LenisProvider>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

