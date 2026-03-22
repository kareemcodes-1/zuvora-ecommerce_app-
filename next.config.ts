import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'lenis',
    'gsap', 
    'framer-motion',
    'swiper',
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "sklep099968.shoparena.pl" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
